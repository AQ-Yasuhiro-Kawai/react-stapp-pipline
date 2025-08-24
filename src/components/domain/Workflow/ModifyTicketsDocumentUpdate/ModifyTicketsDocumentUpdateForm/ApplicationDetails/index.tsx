import {
  ArrowRight,
  File,
  FilePlus,
  FileX,
  Plus,
  RotateCw,
  X,
} from "lucide-react";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { useModal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";
import { FileSelectionModal } from "./FileSelectionModal";

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

type Props = {
  onNext: () => void;
};

const fileElement = (
  <a className="underline" href="/tickets/mytickets/new">
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

// ファイル一覧テーブボディ
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

const sampleSelectItems = [
  { id: "1", name: "サンプル1" },
  { id: "2", name: "サンプル1" },
  { id: "3", name: "サンプル1" },
];

export const ApplicationDetails = ({ onNext }: Props) => {
  const { isOpen, openModal, closeModal } = useModal(); // ファイル追加モーダル

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
          <div>
            <div className="text-[16px]/[21px]">正文書名</div>
            <div className="mt-2 text-sm/[17px]">AAのBBに関する正文書</div>
          </div>
          <div className="pt-4">
            <div className="text-[16px]/[21px]">管理元組織</div>
            <div className="mt-2 text-sm/[17px]">AA総本部　BB本部　CC部</div>
          </div>
          <div className="pt-4">
            <label
              className="inline-block text-[16px]/[21px]"
              htmlFor="publicationTarget"
            >
              公開先組織
            </label>
            <Select
              className="w-full mt-2"
              id="publicationTarget"
              name=""
              placeholder="選択"
              selectItems={sampleSelectItems}
            />
          </div>
          <div className="pt-4">
            <div className="text-[16px]/[21px]">文書種類</div>
            <div className="mt-2 text-sm/[17px]">種類AA</div>
          </div>
          <div className="pt-4">
            <label
              className="inline-block text-[16px]/[21px]"
              htmlFor="publicationScope"
            >
              公開範囲
            </label>
            <Select
              className="w-full mt-2"
              id="publicationScope"
              name=""
              placeholder="選択"
              selectItems={sampleSelectItems}
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle>正文書更新するファイル</SectionTitle>
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
          onClick={onNext}
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
