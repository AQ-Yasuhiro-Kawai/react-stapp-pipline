import { FileX } from "lucide-react";
import type { JSX } from "react";
import { TextInput } from "@/components/ui/Input";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";

type HeaderColumnKeys = {
  icon: JSX.Element;
  file: JSX.Element;
};

const fileElement = (
  <a className="underline text-sub" href="/tickets">
    〇〇.pdf
  </a>
);

const headerColumns: HeaderColumn<HeaderColumnKeys, keyof HeaderColumnKeys>[] =
  [
    { children: "", className: "w-[46px]", key: "icon" },
    { children: "ファイル名", key: "file" },
  ];

const bodyRows = Array.from({ length: 3 }, (_, i) => ({
  cells: {
    icon: <FileX />,
    file: fileElement,
  },
  id: String(i + 1),
  className: "bg-thin-red hover:!bg-thin-red-hover",
}));

export function ApplicationDetailsContent() {
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
        </div>
      </div>
      <div className="mt-10">
        <SectionTitle className="pb-0">正文書削除するファイル一覧</SectionTitle>
        <Table bodyRows={bodyRows} headerColumns={headerColumns} />
      </div>
    </>
  );
}
