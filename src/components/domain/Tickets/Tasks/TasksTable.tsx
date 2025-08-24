import { useMemo } from "react";
import { type BodyRow, type HeaderColumn, Table } from "@/components/ui/Table";
import { SORTED_STATE } from "@/components/ui/Table/components/Table";

type TaskRow = {
  ticketName: string;
  ticketApplicationTypeCode: string;
  userResolved: React.ReactNode;
  ticketStatusTypeCode: React.ReactNode;
  applicantName: string;
  createdAt: string;
  displayTicketId: string;
};

export type ColumnKeys = TaskRow & { icon: React.ReactNode };

type Props = {
  rows: BodyRow<ColumnKeys>[];
  onSort: (params: {
    key: keyof ColumnKeys;
    direction: (typeof SORTED_STATE)[keyof typeof SORTED_STATE];
  }) => void;
  onRowDoubleClick: (row: BodyRow<ColumnKeys>) => void;
  onCellClick: (rowId: string) => void;
  maxPage: number;
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
};

export const TasksTable = ({
  rows,
  onSort,
  onRowDoubleClick,
  onCellClick,
  maxPage,
  currentPage,
  onChangeCurrentPage,
}: Props) => {
  const headerColumns: HeaderColumn<ColumnKeys, keyof ColumnKeys>[] =
    useMemo(() => {
      return [
        {
          children: "",
          className: "w-6",
          key: "icon",
          sorted: SORTED_STATE.NON,
        },
        {
          buttonClassName: "text-sm",
          children: "チケット名",
          className: "flex-1 min-w-40",
          key: "ticketName",
          sorted: SORTED_STATE.UNSORTED,
          onCellClick: (row) => onCellClick(row.id),
        },
        {
          buttonClassName: "text-sm",
          children: "申請種類",
          className: "w-30",
          key: "ticketApplicationTypeCode",
          sorted: SORTED_STATE.UNSORTED,
        },
        {
          buttonClassName: "text-sm",
          children: "対応状況",
          className: "w-30",
          key: "userResolved",
          sorted: SORTED_STATE.UNSORTED,
        },
        {
          buttonClassName: "text-sm",
          children: "ステータス",
          className: "w-30",
          key: "ticketStatusTypeCode",
          sorted: SORTED_STATE.UNSORTED,
        },
        {
          buttonClassName: "text-sm",
          children: "申請者",
          className: "w-40",
          key: "applicantName",
          sorted: SORTED_STATE.UNSORTED,
        },
        {
          buttonClassName: "text-sm",
          children: "申請日",
          className: "w-30",
          key: "createdAt",
          sorted: SORTED_STATE.DESCENDING,
        },
        {
          buttonClassName: "text-sm",
          children: "ID",
          className: "w-50",
          key: "displayTicketId",
          sorted: SORTED_STATE.UNSORTED,
        },
      ];
    }, [onCellClick]);

  return (
    <div className="pt-6">
      <Table
        bodyCellClassName="text-base"
        bodyRows={rows}
        className="pb-10"
        headerColumns={headerColumns}
        onRowDoubleClick={onRowDoubleClick}
        onSort={onSort}
        pagination={{ currentPage, maxPage, onClick: onChangeCurrentPage }}
      />
    </div>
  );
};
