import { getTicketStatusBadge } from "@/components/domain/Tickets/getTicketStatusBadge";
import { getTicketStatusIcon } from "@/components/domain/Tickets/getTicketStatusIcon";
import { useMyTicketsSearch } from "@/components/domain/Tickets/MyTickets/hooks/useMyTicketsSearch";
import { MyticketsSearchArea } from "@/components/domain/Tickets/MyTickets/MyticketsSearchArea";
import {
  type ColumnKeys,
  MyticketsTable,
} from "@/components/domain/Tickets/MyTickets/MyticketsTable";
import { MainContent } from "@/components/ui/Layout";
import type { BodyRow } from "@/components/ui/Table";
import type { SORTED_STATE } from "@/components/ui/Table/components/Table";
import type { TicketStatusTypeCode } from "@/domain/tickets/types";
import {
  APPLICATION_TYPE_ITEMS,
  STATUS_ITEMS,
} from "@/shared/constants/tickets";

export const MyticketsPage = () => {
  const {
    ticketName,
    type,
    status,
    officialDocumentId,
    applicationDateFrom,
    applicationDateTo,
    completedDateFrom,
    completedDateTo,
    handleChangeTicketName,
    handleChangeType,
    handleChangeStatus,
    handleChangeOfficialDocumentId,
    handleChangeApplicationDateFrom,
    handleChangeApplicationDateTo,
    handleChangeCompletedDateFrom,
    handleChangeCompletedDateTo,
  } = useMyTicketsSearch();
  const dummyList: BodyRow<ColumnKeys>[] = Array.from(
    { length: 100 },
    (_, i) => {
      const id = `${i + 1}`;
      const type =
        APPLICATION_TYPE_ITEMS[i % APPLICATION_TYPE_ITEMS.length].label;
      const status = STATUS_ITEMS[i % STATUS_ITEMS.length]
        .value as TicketStatusTypeCode;

      return {
        // 下記コメントで意図的にcspell解除（オブジェクトキーの並び順が変更され、モックデータとして使用しにくいため）
        cells: {
          icon: getTicketStatusIcon(status),
          ticketName:
            i % 3 === 0
              ? `チケット${id}`
              : `チケット名${id}チケットチケットチケットチケットチケットチケットチケットチケットチケットチケットチケットチケット`,
          type,
          status: getTicketStatusBadge(status),
          applicationDate: `2025-10-${String((i % 30) + 1).padStart(2, "0")}`,
          completedDate:
            i % 3 === 0
              ? `2025-10-${String((i % 30) + 1).padStart(2, "0")}`
              : "",
          officialDocumentId: `正文書登録-2025-10-${String((i % 30) + 1).padStart(2, "0")}-${id}`,
        },
        id,
      };
    },
  );

  const handleSortClick = (params: {
    key: keyof ColumnKeys;
    direction: (typeof SORTED_STATE)[keyof typeof SORTED_STATE];
  }) => {
    console.log("ソート対象カラム:", params.key);
    console.log("ソート方向:", params.direction);
  };

  return (
    <MainContent pageTitle="マイチケット">
      <MyticketsSearchArea
        applicationDateFrom={applicationDateFrom}
        applicationDateTo={applicationDateTo}
        completedDateFrom={completedDateFrom}
        completedDateTo={completedDateTo}
        officialDocumentId={officialDocumentId}
        onChangeApplicationDateFrom={handleChangeApplicationDateFrom}
        onChangeApplicationDateTo={handleChangeApplicationDateTo}
        onChangeCompletedDateFrom={handleChangeCompletedDateFrom}
        onChangeCompletedDateTo={handleChangeCompletedDateTo}
        onChangeOfficialDocumentId={handleChangeOfficialDocumentId}
        onChangeStatus={handleChangeStatus}
        onChangeTicketName={handleChangeTicketName}
        onChangeType={handleChangeType}
        status={status}
        ticketName={ticketName}
        type={type}
      />
      <MyticketsTable onSort={handleSortClick} rows={dummyList} />
    </MainContent>
  );
};
