import { File } from "lucide-react";
import { useMemo } from "react";
import type { DocumentVersionDetail } from "@/components/domain/Documents/types";
import { type BodyRow, type HeaderColumn, Table } from "@/components/ui/Table";

type TicketRow = {
  documentItemName: string;
};

export type ColumnKeys = TicketRow & { icon: React.ReactNode };

type Props = {
  onDocumentNameClick: (id: string) => void;
  onRowDoubleClick: (id: string) => void;
  documentVersionDetail: DocumentVersionDetail;
};

export const DocumentsVersionDetailTable = ({
  onRowDoubleClick,
  onDocumentNameClick,
  documentVersionDetail,
}: Props) => {
  const rows: BodyRow<ColumnKeys>[] =
    documentVersionDetail.officialDocumentItems.map((item) => ({
      id: item.id,
      cells: {
        icon: <File />,
        documentItemName: item.officialDocumentItem.fileName,
      },
    }));
  const headerColumns: HeaderColumn<ColumnKeys, keyof ColumnKeys>[] = useMemo(
    () => [
      { children: "", className: "w-6", key: "icon" },
      {
        children: "",
        key: "documentItemName",
        onCellClick: (row) => onDocumentNameClick(row.id),
      },
    ],
    [onDocumentNameClick],
  );

  return (
    <div className="mt-6 border-t">
      <Table
        bodyRows={rows}
        headerColumns={headerColumns}
        headerInvisible={true}
        onRowDoubleClick={(row) => onRowDoubleClick(row.id)}
      />
    </div>
  );
};
