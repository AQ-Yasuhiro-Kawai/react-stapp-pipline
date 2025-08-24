import {
  ArrowRight,
  File,
  FilePlus,
  FileX,
  Folder,
  Plus,
  RotateCw,
  X,
} from "lucide-react";
import type { JSX } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { Modal, useModal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";

type SelectFileRow = {
  officialDocument: React.ReactNode;
  updater: string;
  updateTime: string;
};

type SelectedFileRow = {
  currentFileIcon: JSX.Element | undefined;
  currentFile: JSX.Element | undefined;
  convertIcon: JSX.Element | undefined;
  updateFileIcon: JSX.Element;
  updateFile: JSX.Element;
  sourceFile: JSX.Element | undefined;
  button: JSX.Element;
};

type SelectFileColumnKeys = SelectFileRow & { icon: React.ReactNode };

type SelectedFileColumnKeys = SelectedFileRow;

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

// 選択時ファイル一覧テーブルヘッダ
const SelectFileHeaderColumns: HeaderColumn<
  SelectFileColumnKeys,
  keyof SelectFileColumnKeys
>[] = [
  { children: "", className: "w-[46px]", key: "icon" },
  { children: "正文書", key: "officialDocument" },
  {
    children: "更新者",
    className: "w-[160px]",
    key: "updater",
  },
  {
    children: "更新日時",
    className: "w-[160px]",
    key: "updateTime",
  },
];

// 選択時ファイル一覧テーブルボディ
const SelectFileBodyRows = Array.from({ length: 20 }, (_, i) => ({
  cells: {
    icon: <Folder />,
    officialDocument: fileElement,
    updater: "田中 太郎",
    updateTime: "2025/01/01 10:10",
  },
  id: String(i + 1),
}));

// 選択済みファイル一覧テーブルヘッダ
const SelectedFileHeaderColumns: HeaderColumn<
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

const dummyBodyRows = [
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

// ファイル追加モーダル内のパンくずリスト
const crumbs = [
  { id: "1", label: "トップ", driveId: "1" },
  { id: "2", label: "フォルダB", driveId: "1" },
];

const sampleSelectItems = [
  { id: "1", name: "サンプル1" },
  { id: "2", name: "サンプル1" },
  { id: "3", name: "サンプル1" },
];

export function ApplicationDetailsContent() {
  const { isOpen, openModal, closeModal } = useModal();

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
        <Table
          bodyRows={dummyBodyRows}
          headerColumns={SelectedFileHeaderColumns}
        />
        <Modal
          className="max-w-[800px] h-[800px] gap-0"
          closeModalHandler={closeModal}
          isCloseOutsideModal
          isOpen={isOpen}
          primaryButton={
            <Button
              onClick={() => {
                closeModal();
              }}
            >
              決定
            </Button>
          }
          title="ファイルを追加"
        >
          <div className="mt-6">
            <Breadcrumb crumbs={crumbs} />
          </div>
          <div className="flex-1 min-h-0 relative overflow-hidden mb-1">
            <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-main-bg to-transparent z-50 pointer-events-none" />
            <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-main-bg to-transparent z-50 pointer-events-none" />
            <div className="h-full overflow-y-auto relative z-0 py-4">
              <Table
                bodyRows={SelectFileBodyRows}
                headerColumns={SelectFileHeaderColumns}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
