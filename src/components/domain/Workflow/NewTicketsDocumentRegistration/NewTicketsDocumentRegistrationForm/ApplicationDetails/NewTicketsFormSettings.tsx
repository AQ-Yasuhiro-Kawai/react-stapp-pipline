import { ArrowRight, File, LoaderCircle, Plus, X } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import type { UseFetch } from "@/components/domain/Workflow/NewTicketsDocumentRegistration/NewTicketsDocumentRegistrationForm/useFetch";
import { STEP_IDS } from "@/components/domain/Workflow/useWorkflowFormStep";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { useModal } from "@/components/ui/Modal";
import { RhfSelect } from "@/components/ui/Select/RhfSelect";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";
import type { Project } from "@/domain/Projects/type";
import { pdfFileSelector } from "@/store/projects/pdfFileSlice";
import { useBoundStore } from "@/store/store";
import type {
  NewTicketsFormState,
  WorkflowFormStepContentProps,
} from "../index";
import { FileSelectionModal } from "./FileSelectionModal";

type SelectedFileRow = {
  file: React.ReactNode;
  sourceFile: React.ReactNode;
};

type SelectedFileColumnKeys = SelectedFileRow & {
  icon: React.ReactNode;
  button: React.ReactNode;
};

// 選択済みファイル一覧テーブルヘッダ
const SelectedFileHeaderColumns: HeaderColumn<
  SelectedFileColumnKeys,
  keyof SelectedFileColumnKeys
>[] = [
  { children: "", className: "w-[46px]", key: "icon" },
  { children: "ファイル名", key: "file" },
  { children: "", key: "sourceFile", className: "w-[128px]" },
  {
    children: "",
    className: "w-[46px]",
    key: "button",
  },
];

const publicationScopeOptions = [
  { id: "1", name: "全従業員公開可" },
  { id: "2", name: "社員のみ公開可" },
];

const MAX_REGISTERED_FILES = 20 as const;

type DirtyFieldsKey = Pick<
  NewTicketsFormState["dirtyFields"],
  | "ticketName"
  | "sourceOrganizationCode"
  | "targetOrganizationCode"
  | "fileTypeCode"
  | "publicationScopeCode"
>;

type Props = {
  formState: NewTicketsFormState;
  values: UseFetch["values"];
  onNext: WorkflowFormStepContentProps["onUpdateSteps"];
};
export const NewTicketsFormSettings = ({
  formState,
  values,
  onNext,
}: Props) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { register, errors, control, dirtyFields } = formState;
  const { files, removeFile } = useBoundStore(useShallow(pdfFileSelector));
  const watchFields = useWatch({
    control,
    name: "sourceOrganizationCode",
  });

  // 申請内容入力の必須項目が入力済みかどうか
  // biome-ignore lint/correctness/useExhaustiveDependencies: dirtyFields単体でdepsにいれるとフィールドの値が変わっても参照が変わらないため
  const isDirty = useMemo(() => {
    const requiredFields: (keyof DirtyFieldsKey)[] = [
      "ticketName",
      "sourceOrganizationCode",
      "targetOrganizationCode",
      "fileTypeCode",
      "publicationScopeCode",
    ];

    const fileLengthValid =
      files.length > 0 && files.length <= MAX_REGISTERED_FILES;

    return (
      requiredFields.every((key) => dirtyFields[key] === true) &&
      fileLengthValid
    );
  }, [
    dirtyFields.ticketName,
    dirtyFields.sourceOrganizationCode,
    dirtyFields.targetOrganizationCode,
    dirtyFields.fileTypeCode,
    dirtyFields.publicationScopeCode,
    files,
  ]);

  // 管理元組織のコンボボックス選択肢
  const sourceOrganizationOptions = useMemo(() => {
    return values.sourceOrganization.map((org) => ({
      id: org.code,
      name: org.name,
    }));
  }, [values.sourceOrganization]);

  // 対象組織のコンボボックス選択肢
  const targetOrganizationOptions = useMemo(() => {
    return values.targetOrganization.map((org) => ({
      id: org.code,
      name: org.name,
    }));
  }, [values.targetOrganization]);

  // ファイル種別のコンボボックス選択肢
  // sourceOrganizationOptionsで選択された組織のcode(id)を利用してfindする
  // find結果をoptionsに変換して返す
  const fileTypeOptions = useMemo(() => {
    const options = values.fileTypeCode.organizationFileTypes.find(
      (fileType) => fileType.organization.code === watchFields.id,
    );

    if (!options) return [];

    return options.supportedDocumentTypes.map((o, i) => ({
      id: String(i + 1), // supportedDocumentTypesがstring[]なのでindexをidに利用
      name: o,
    }));
  }, [watchFields, values.fileTypeCode]);

  const removePdfFile = useCallback(
    (id: Project["items"][number]["providerItemId"]) => {
      removeFile(id);
    },
    [removeFile],
  );

  const handleOnNext = useCallback(() => {
    // useReducerのNEXT_STEPアクションを使用
    // Loading状態は自動的に計算される
    onNext([
      { id: STEP_IDS.APPLICATION_DETAILS, status: "done" }, // 申請内容入力ステップを完了
      { id: STEP_IDS.APPROVER, status: "current" }, // 承認者選択ステップを開始
    ]);
  }, [onNext]);

  // 選択済みファイル一覧テーブルボディ
  const SelectedFileBodyRows = useMemo(() => {
    // TODO: 選択されたファイルの配列で生成する
    return files.map((file) => {
      return {
        id: file.originalItemInfo.fileId,
        cells: {
          icon:
            file.status === "converting" ? (
              <LoaderCircle className="animate-spin text-primary" />
            ) : (
              <File className="text-sub-text" />
            ),
          file: (
            <a
              className="underline"
              href={file.generatedFileBlobUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {file.originalItemInfo.fileName}
            </a>
          ),
          sourceFile: (
            <a
              className="underline text-sub-text"
              href={file.originalFileBlobUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              変換元ファイル
            </a>
          ),
          button: (
            <Button
              onClick={() => removePdfFile(file.originalItemInfo.fileId)}
              prefixElement={<X />}
              size={SIZE.ICON}
              variant={VARIANT.GHOST}
            />
          ),
        },
      };
    });
  }, [files, removePdfFile]);

  return (
    <>
      <div className="mt-10">
        <SectionTitle>正文書設定</SectionTitle>
        <div className="w-[400px]">
          <TextInput
            className="w-full"
            isValid={!errors.ticketName}
            placeholder="例）〇〇に関する稟議書と補足資料"
            title="チケット名"
            validationText={errors.ticketName?.message}
            {...register("ticketName")}
          />
          <TextInput
            className="w-full"
            isValid={!errors.documentName}
            placeholder="正文書名の指定がない場合、自動で命名されます。"
            title="正文書名（任意）"
            validationText={errors.documentName?.message}
            {...register("documentName")}
          />
        </div>
        <div className="w-[400px] mt-4 space-y-4">
          <div>
            <p>管理元組織</p>
            <RhfSelect
              className="w-full"
              control={control}
              name="sourceOrganizationCode"
              selectItems={sourceOrganizationOptions}
            />
          </div>
          <div>
            <p>公開先組織</p>
            <RhfSelect
              className="w-full"
              control={control}
              name="targetOrganizationCode"
              selectItems={targetOrganizationOptions}
            />
          </div>
          <div>
            <p>文書種類</p>
            <RhfSelect
              className="w-full"
              control={control}
              name="fileTypeCode"
              selectItems={fileTypeOptions}
            />
          </div>
          <div>
            <p>公開範囲</p>
            <RhfSelect
              className="w-full"
              control={control}
              name="publicationScopeCode"
              selectItems={publicationScopeOptions}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <SectionTitle>正文書登録するファイル</SectionTitle>
        <Button
          onClick={openModal}
          prefixElement={<Plus />}
          variant={VARIANT.OUTLINED}
        >
          ファイル追加
        </Button>
        <Table
          bodyRows={SelectedFileBodyRows}
          headerColumns={SelectedFileHeaderColumns}
        />
        {files.length > MAX_REGISTERED_FILES && (
          <p className="text-main-red m-3 text-center">
            登録できるファイルは20件までです
          </p>
        )}
      </div>

      <div className="flex justify-end mt-4 mb-10">
        <Button
          disabled={!isDirty}
          onClick={handleOnNext}
          suffixElement={<ArrowRight />}
          variant={VARIANT.PRIMARY}
        >
          次へ
        </Button>
      </div>

      <FileSelectionModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};
