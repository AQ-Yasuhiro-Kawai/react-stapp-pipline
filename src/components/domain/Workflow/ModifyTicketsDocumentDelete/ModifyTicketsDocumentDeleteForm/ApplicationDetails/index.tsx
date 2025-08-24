import { ArrowRight, FileX } from "lucide-react";
import { useCallback } from "react";

import { Button, VARIANT } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";
import { STEP_IDS } from "../../../useWorkflowFormStep";
import type { WorkflowFormStepContentProps } from "..";

type FileRow = {
  file: React.ReactNode;
};

type FileColumnKeys = FileRow & { icon: React.ReactNode };

type Props = {
  onNext: WorkflowFormStepContentProps["onUpdateSteps"];
};

const headerColumns: HeaderColumn<FileColumnKeys, keyof FileColumnKeys>[] = [
  { children: "", className: "w-[46px]", key: "icon" },
  { children: "ファイル名", key: "file" },
];

const bodyRows = Array.from({ length: 3 }, (_, i) => ({
  cells: {
    icon: <FileX />,
    file: (
      <a className="underline" href="/">
        〇〇.pdf
      </a>
    ),
  },
  id: String(i + 1),
  className: "bg-thin-red hover:!bg-thin-red-hover",
}));

export const ApplicationDetails = ({ onNext }: Props) => {
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
          <div>
            <TextInput
              className="w-full"
              placeholder="例）〇〇に関する稟議書と補足資料"
              title="チケット名"
            />
          </div>
          <div>
            <p className="text-[16px]/[19px]">正文書名</p>
            <p className="mt-2 text-sm/[17px]">AAのBBに関する正文書</p>
          </div>
          <div className="pt-4">
            <p className="text-[16px]/[19px]">管理元組織</p>
            <p className="mt-2 text-sm/[17px]">AA総本部　BB本部　CC部</p>
          </div>
          <div className="pt-4">
            <p className="text-[16px]/[19px]">公開先組織</p>
            <p className="mt-2 text-sm/[17px]">DD総本部　EE本部　FF部</p>
          </div>
          <div className="pt-4">
            <p className="text-[16px]/[19px]">文書種類</p>
            <p className="mt-2 text-sm/[17px]">種類AA</p>
          </div>
          <div className="pt-4">
            <p className="text-[16px]/[19px]">公開範囲</p>
            <p className="mt-2 text-sm/[17px]">AAのみ</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle className="pb-0">正文書削除するファイル</SectionTitle>
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
    </>
  );
};
