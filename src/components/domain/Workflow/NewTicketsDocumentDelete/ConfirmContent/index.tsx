import { FileX } from "lucide-react";
import type { JSX } from "react";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { Textarea } from "@/components/ui/TextArea";
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

export function ConfirmContent() {
  return (
    <>
      <div className="mt-10">
        <SectionTitle>正文書設定</SectionTitle>
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
    </>
  );
}
