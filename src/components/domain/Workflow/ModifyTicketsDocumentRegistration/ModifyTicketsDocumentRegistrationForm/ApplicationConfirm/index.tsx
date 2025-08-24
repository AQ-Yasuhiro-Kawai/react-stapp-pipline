import { ArrowLeft, File, X, Zap } from "lucide-react";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { useModal } from "@/components/ui/Modal";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { Textarea } from "@/components/ui/TextArea";
import { SectionTitle } from "@/components/ui/Title";
import { ConfirmModal } from "./ConfirmModal";

type Props = {
  onBack: () => void;
};

type SelectedFileRow = {
  file: React.ReactNode;
  sourceFile: React.ReactNode;
};

type SelectedFileColumnKeys = SelectedFileRow & {
  icon: React.ReactNode;
  button: React.ReactNode;
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

export const ApplicationConfirm = ({ onBack }: Props) => {
  const { isOpen, openModal, closeModal } = useModal(); // 最終確認モーダル

  const handleSubmit = () => {
    closeModal();
    console.log("申請完了");
  };

  return (
    <>
      <div className="mt-10">
        <SectionTitle>内容確認</SectionTitle>
        <div>
          <p className="text-[16px]/[19px]">チケット名</p>
          <p className="mt-2 text-sm/[17px]">AAのBBに関する正文書の申請</p>
        </div>
        <div className="pt-4">
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
        <Table bodyRows={bodyRows} headerColumns={headerColumns} />
      </div>

      <div className="mt-10">
        <SectionTitle>備考</SectionTitle>
        <Textarea
          heightSize="lg"
          placeholder="必須ではない。300文字まで。"
          widthSize="full"
        />
      </div>

      <div className="flex justify-between mt-4 mb-10">
        <Button
          onClick={onBack}
          prefixElement={<ArrowLeft />}
          variant={VARIANT.OUTLINED}
        >
          戻る
        </Button>
        <Button
          onClick={openModal}
          prefixElement={<Zap />}
          variant={VARIANT.PRIMARY}
        >
          申請
        </Button>
      </div>

      <ConfirmModal
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
};
