import { useState } from "react";
import { type BodyRow, type HeaderColumn, Table } from "@/components/ui/Table";
import { SORTED_STATE } from "@/components/ui/Table/components/Table";

type TicketRow = {
  ticketName: string;
  type: string;
  status: React.ReactNode;
  applicationDate: string;
  completedDate: string;
  officialDocumentId: string;
};

export type ColumnKeys = TicketRow & { icon: React.ReactNode };

const headerColumns: HeaderColumn<ColumnKeys, keyof ColumnKeys>[] = [
  { children: "", className: "w-6", key: "icon", sorted: SORTED_STATE.NON },
  {
    buttonClassName: "text-sm",
    children: "チケット名",
    className: "flex-1 min-w-40",
    key: "ticketName",
    sorted: SORTED_STATE.UNSORTED,
  },
  {
    buttonClassName: "text-sm",
    children: "申請種類",
    className: "w-30",
    key: "type",
    sorted: SORTED_STATE.UNSORTED,
  },
  {
    buttonClassName: "text-sm",
    children: "ステータス",
    className: "w-30",
    key: "status",
    sorted: SORTED_STATE.UNSORTED,
  },
  {
    buttonClassName: "text-sm",
    children: "申請日",
    className: "w-30",
    key: "applicationDate",
    sorted: SORTED_STATE.UNSORTED,
  },
  {
    buttonClassName: "text-sm",
    children: "完了日",
    className: "w-30",
    key: "completedDate",
    sorted: SORTED_STATE.UNSORTED,
  },
  {
    buttonClassName: "text-sm",
    children: "ID",
    className: "w-50",
    key: "officialDocumentId",
    sorted: SORTED_STATE.UNSORTED,
  },
];

type Props = {
  rows: BodyRow<ColumnKeys>[];
  onSort: (params: {
    key: keyof ColumnKeys;
    direction: (typeof SORTED_STATE)[keyof typeof SORTED_STATE];
  }) => void;
};

export const MyticketsTable = ({ rows, onSort }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const maxPage = Math.ceil(rows.length / pageSize);
  const pagedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="pt-6">
      <Table
        bodyCellClassName="text-base"
        bodyRows={pagedRows}
        headerColumns={headerColumns}
        onSort={onSort}
        pagination={{ currentPage, maxPage, onClick: setCurrentPage }}
      />
    </div>
  );
};
