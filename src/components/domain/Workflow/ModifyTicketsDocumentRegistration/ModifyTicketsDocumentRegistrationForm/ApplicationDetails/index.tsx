import type { WorkflowFormStepContentProps } from "@components/domain/Workflow/NewTicketsDocumentRegistration/NewTicketsDocumentRegistrationForm";
import { ArrowRight, File, Plus, X } from "lucide-react";
import { useCallback } from "react";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { useModal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";
import { STEP_IDS } from "../../../useWorkflowFormStep";
import { FileSelectionModal } from "./FileSelectionModal";

type SelectedFileRow = {
  file: React.ReactNode;
  sourceFile: React.ReactNode;
};

type SelectedFileColumnKeys = SelectedFileRow & {
  icon: React.ReactNode;
  button: React.ReactNode;
};

type Props = {
  onNext: WorkflowFormStepContentProps["onUpdateSteps"];
};

// ファイル一覧テーブルヘッダ
const headerColumns: HeaderColumn<
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

// ファイル一覧テーブボディ
const bodyRows = [
  {
    id: "1",
    cells: {
      icon: <File />,
      file: (
        <a
          className="underline"
          href="/"
          rel="noopener noreferrer"
          target="_blank"
        >
          〇〇.pdf
        </a>
      ),
      sourceFile: (
        <a
          className="underline text-sub-text"
          href="/"
          rel="noopener noreferrer"
          target="_blank"
        >
          変換元ファイル
        </a>
      ),
      button: (
        <Button
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        />
      ),
    },
  },
  {
    id: "2",
    cells: {
      icon: <File />,
      file: (
        <a
          className="underline"
          href="/"
          rel="noopener noreferrer"
          target="_blank"
        >
          〇〇.pdf
        </a>
      ),
      sourceFile: (
        <a
          className="underline text-sub-text"
          href="/"
          rel="noopener noreferrer"
          target="_blank"
        >
          変換元ファイル
        </a>
      ),
      button: (
        <Button
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        />
      ),
    },
  },
];

const sampleSelectItems = [
  { id: "1", name: "サンプル1" },
  { id: "2", name: "サンプル1" },
  { id: "3", name: "サンプル1" },
];

export const ApplicationDetails = ({ onNext }: Props) => {
  const { isOpen, openModal, closeModal } = useModal(); // ファイル追加モーダル

  const handleOnNext = useCallback(() => {
    // useReducerのNEXT_STEPアクションを使用
    // Loading状態は自動的に計算される
    onNext([
      { id: STEP_IDS.APPLICATION_DETAILS, status: "done" }, // 申請内容入力ステップを完了
      { id: STEP_IDS.APPROVER, status: "current" }, // 承認者選択ステップを開始
    ]);
  }, [onNext]);

  return (
    <>
      <div className="mt-10">
        <SectionTitle>正文書設定</SectionTitle>
        <div className="w-[400px]">
          <TextInput
            className="w-full"
            placeholder="例）〇〇に関する稟議書と補足資料"
            title="チケット名"
          />
          <TextInput
            className="w-full"
            placeholder="正文書名の指定がない場合、自動で命名されます。"
            title="正文書名（任意）"
          />
          <div>
            <label
              className="inline-block text-[16px]/[19px]"
              htmlFor="sourceOrganizationCode"
            >
              管理元組織
            </label>
            <Select
              className="w-full mt-2"
              id="sourceOrganizationCode"
              name=""
              placeholder="選択"
              selectItems={sampleSelectItems}
            />
          </div>
          <div className="pt-4">
            <label
              className="inline-block text-[16px]/[19px]"
              htmlFor="targetOrganizationCode"
            >
              公開先組織
            </label>
            <Select
              className="w-full mt-2"
              id="targetOrganizationCode"
              name=""
              placeholder="選択"
              selectItems={sampleSelectItems}
            />
          </div>
          <div className="pt-4">
            <label
              className="inline-block text-[16px]/[19px]"
              htmlFor="fileTypeCode"
            >
              文書種類
            </label>
            <Select
              className="w-full mt-2"
              id="fileTypeCode"
              name=""
              placeholder="選択"
              selectItems={sampleSelectItems}
            />
          </div>
          <div className="pt-4">
            <label
              className="inline-block text-[16px]/[19px]"
              htmlFor="publicationScopeCode"
            >
              公開範囲
            </label>
            <Select
              className="w-full mt-2"
              id="publicationScopeCode"
              name=""
              placeholder="選択"
              selectItems={sampleSelectItems}
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
        <Table bodyRows={bodyRows} headerColumns={headerColumns} />
      </div>

      <div className="flex justify-end mt-4 mb-10">
        <Button
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
