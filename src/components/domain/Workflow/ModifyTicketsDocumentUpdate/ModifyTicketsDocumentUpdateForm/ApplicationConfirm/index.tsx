import {
  ArrowLeft,
  ArrowRight,
  File,
  FilePlus,
  FileX,
  RotateCw,
  X,
  Zap,
} from "lucide-react";
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
  currentFile: React.ReactNode; // 現在のファイル
  updateFile: React.ReactNode; // 更新後のファイル
};

type SelectedFileColumnKeys = SelectedFileRow & {
  currentFileIcon: React.ReactNode;
  convertIcon: React.ReactNode;
  updateFileIcon: React.ReactNode;
  sourceFile: React.ReactNode;
  button: React.ReactNode;
};

const fileElement = (
  <a className="underline text-sub" href="/tickets">
    〇〇.pdf
  </a>
);

const fileElementSub = (
  <a className="underline" href="/tickets/mytickets/new">
    〇〇.pdf（変更なし）
  </a>
);

const sourceFileElement = (
  <a className="underline text-sub-text" href="/tickets/mytickets/new">
    変換元ファイル
  </a>
);

// ファイル一覧テーブルヘッダ
const headerColumns: HeaderColumn<
  SelectedFileColumnKeys,
  keyof SelectedFileColumnKeys
>[] = [
  { children: "", className: "w-[48px]", key: "currentFileIcon" },
  {
    children: "現在のファイル",
    key: "currentFile",
  },
  {
    children: "",
    className: "w-[46px]",
    key: "convertIcon",
  },
  { children: "", key: "updateFileIcon", className: "w-[46px]" },
  {
    children: "更新後のファイル",
    key: "updateFile",
  },
  { children: "", key: "sourceFile", className: "w-[128px]" },
  {
    children: "",
    className: "w-[60px]",
    key: "button",
  },
];

// ファイル一覧テーブルヘッダ
const bodyRows = [
  {
    id: "1",
    cells: {
      currentFileIcon: <File />,
      currentFile: fileElement,
      convertIcon: <ArrowRight />,
      updateFileIcon: <File />,
      updateFile: fileElementSub,
      sourceFile: undefined,
      button: (
        <Button
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        />
      ),
    },
    className: "text-sub-text",
  },
  {
    id: "2",
    cells: {
      currentFileIcon: <File />,
      currentFile: fileElement,
      convertIcon: <ArrowRight />,
      updateFileIcon: <File />,
      updateFile: fileElement,
      sourceFile: sourceFileElement,
      button: (
        <Button
          className="hover:bg-main-blue/10"
          prefixElement={<RotateCw />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        />
      ),
    },
    className: "bg-main-blue/10 hover:!bg-main-blue/20",
  },
  {
    id: "3",
    cells: {
      currentFileIcon: <File />,
      currentFile: fileElement,
      convertIcon: <ArrowRight />,
      updateFileIcon: <FileX className="text-main-red" />,
      updateFile: <span className="text-main-red">（削除）</span>,
      sourceFile: undefined,
      button: (
        <Button
          className="hover:bg-thin-red"
          prefixElement={<RotateCw />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        />
      ),
    },
    className: "bg-thin-red hover:!bg-thin-red-hover",
  },
  {
    id: "4",
    cells: {
      currentFileIcon: undefined,
      currentFile: undefined,
      convertIcon: undefined,
      updateFileIcon: <FilePlus />,
      updateFile: fileElement,
      sourceFile: sourceFileElement,
      button: (
        <Button
          className="hover:bg-main-green/10"
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        />
      ),
    },
    className: "bg-main-green/10 hover:!bg-main-green/20",
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
          <div className="text-[16px]/[21px]">チケット名</div>
          <div className="mt-2 text-sm/[17px]">AAのBBに関する正文書の申請</div>
        </div>
        <div className="pt-4">
          <div className="text-[16px]/[21px]">正文書名</div>
          <div className="mt-2 text-sm/[17px]">AAのBBに関する正文書</div>
        </div>
        <div className="pt-4">
          <div className="text-[16px]/[21px]">管理元組織</div>
          <div className="mt-2 text-sm/[17px]">AA総本部　BB本部　CC部</div>
        </div>
        <div className="pt-4">
          <div className="text-[16px]/[21px]">公開先組織</div>
          <div className="mt-2 text-sm/[17px]">DD総本部　EE本部　FF部</div>
        </div>
        <div className="pt-4">
          <div className="text-[16px]/[21px]">文書種類</div>
          <div className="mt-2 text-sm/[17px]">種類AA</div>
        </div>
        <div className="pt-4">
          <div className="text-[16px]/[21px]">公開範囲</div>
          <div className="mt-2 text-sm/[17px]">AAのみ</div>
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
