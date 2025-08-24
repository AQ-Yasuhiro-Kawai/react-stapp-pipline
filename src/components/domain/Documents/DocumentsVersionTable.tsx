import { Files } from "lucide-react";
import { useMemo } from "react";
import type { DocumentVersion } from "@/components/domain/Documents/types";
import { type BodyRow, type HeaderColumn, Table } from "@/components/ui/Table";
import { formatDateTimeFromString } from "@/utils/dateFormatter";

type TicketRow = {
  version: string;
  createdBy: string;
  createdAt: string;
};

export type ColumnKeys = TicketRow & { icon: React.ReactNode };

type Props = {
  onVersionClick: (versionId: string) => void;
  onRowDoubleClick: (versionId: string) => void;
  documentVersions: DocumentVersion;
};

export const DocumentsVersionTable = ({
  onRowDoubleClick,
  onVersionClick,
  documentVersions,
}: Props) => {
  const rows: BodyRow<ColumnKeys>[] =
    documentVersions.officialDocumentVersions.map((item) => ({
      id: item.id,
      cells: {
        icon: <Files />,
        version: `Ver. ${item.version}`,
        createdBy: item.updatedUser,
        createdAt: formatDateTimeFromString(item.updatedAt),
      },
    }));
  const headerColumns: HeaderColumn<ColumnKeys, keyof ColumnKeys>[] = useMemo(
    () => [
      {
        children: "",
        className: "w-6",
        key: "icon",
      },
      {
        children: "Ver",
        className: "w-20",
        key: "version",
        onCellClick: (row) => onVersionClick(row.id),
      },
      {
        children: "作成者",
        className: "w-40",
        key: "createdBy",
      },
      {
        children: "作成日時",
        key: "createdAt",
      },
    ],
    [onVersionClick],
  );

  return (
    <div className="mt-4">
      <Table
        bodyRows={rows ?? []}
        headerColumns={headerColumns}
        onRowDoubleClick={(row) => onRowDoubleClick(row.id)}
      />
    </div>
  );
};
