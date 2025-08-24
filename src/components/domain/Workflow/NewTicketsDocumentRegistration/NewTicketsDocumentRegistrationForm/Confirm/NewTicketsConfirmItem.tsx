import { File, LoaderCircle } from "lucide-react";
import { memo, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import type { NewTicketsFormSchema } from "@/components/domain/Workflow/NewTicketsDocumentRegistration/schema/formSchema";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";
import { pdfFileSelector } from "@/store/projects/pdfFileSlice";
import { useBoundStore } from "@/store/store";

type Detail = {
  id: number;
  label: string;
  value:
    | NewTicketsFormSchema["ticketName"]
    | NewTicketsFormSchema["documentName"]
    | NewTicketsFormSchema["sourceOrganizationCode"]["name"]
    | NewTicketsFormSchema["targetOrganizationCode"]["name"]
    | NewTicketsFormSchema["fileTypeCode"]["name"]
    | NewTicketsFormSchema["publicationScopeCode"]["name"];
};

const Detail = memo(({ items }: { items: Detail[] }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <dl className="space-y-2" key={item.id}>
          <dt>{item.label}</dt>
          <dd className="text-[14px]">{item.value}</dd>
        </dl>
      ))}
    </div>
  );
});

type SelectedFileRow = {
  file: React.ReactNode;
  sourceFile: React.ReactNode;
};

type SelectedFileColumnKeys = SelectedFileRow & {
  icon: React.ReactNode;
};

// 選択済みファイル一覧テーブルヘッダ
const SelectedFileHeaderColumns: HeaderColumn<
  SelectedFileColumnKeys,
  keyof SelectedFileColumnKeys
>[] = [
  { children: "", className: "w-[46px]", key: "icon" },
  { children: "ファイル名", key: "file" },
  { children: "", key: "sourceFile", className: "w-[136px]" },
];

type Props = {
  ticketName: NewTicketsFormSchema["ticketName"];
  documentName: NewTicketsFormSchema["documentName"];
  targetOrganizationCode: NewTicketsFormSchema["targetOrganizationCode"];
  sourceOrganizationCode: NewTicketsFormSchema["sourceOrganizationCode"];
  fileTypeCode: NewTicketsFormSchema["fileTypeCode"];
  publicationScopeCode: NewTicketsFormSchema["publicationScopeCode"];
};

export function NewTicketsConfirm({
  ticketName,
  documentName,
  targetOrganizationCode,
  sourceOrganizationCode,
  fileTypeCode,
  publicationScopeCode,
}: Props) {
  const { files } = useBoundStore(useShallow(pdfFileSelector));

  const applicationItems: Detail[] = useMemo(() => {
    return [
      { id: 1, label: "チケット名", value: ticketName },
      { id: 2, label: "正文書名", value: documentName || "未設定" },
      { id: 3, label: "管理元組織", value: sourceOrganizationCode.name },
      { id: 4, label: "公開先組織", value: targetOrganizationCode.name },
      { id: 5, label: "文書種類", value: fileTypeCode.name },
      { id: 6, label: "公開範囲", value: publicationScopeCode.name },
    ];
  }, [
    ticketName,
    documentName,
    targetOrganizationCode,
    sourceOrganizationCode,
    fileTypeCode,
    publicationScopeCode,
  ]);

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
        },
      };
    });
  }, [files]);

  return (
    <>
      <SectionTitle>内容確認</SectionTitle>
      <Detail items={applicationItems} />
      <Table
        bodyRows={SelectedFileBodyRows}
        headerColumns={SelectedFileHeaderColumns}
      />
    </>
  );
}
