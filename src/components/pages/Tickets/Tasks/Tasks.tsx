import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { getTicketStatusBadge } from "@/components/domain/Tickets/getTicketStatusBadge";
import { getTicketStatusIcon } from "@/components/domain/Tickets/getTicketStatusIcon";
import { getTaskResolvedBadge } from "@/components/domain/Tickets/Tasks/getTaskResolvedBadge";
import type { Card } from "@/components/domain/Tickets/Tasks/mobile/TaskSummaryCard";
import {
  TaskSummaryList,
  type TaskSummaryListProps,
} from "@/components/domain/Tickets/Tasks/mobile/TaskSummaryList";
import { TasksSearchAreaMobile } from "@/components/domain/Tickets/Tasks/mobile/TasksSearchAreaMobile";
import { useTasksSearch } from "@/components/domain/Tickets/Tasks/search/useTasksSearch";
import { TasksSearchArea } from "@/components/domain/Tickets/Tasks/TasksSearchArea";
import {
  type ColumnKeys,
  TasksTable,
} from "@/components/domain/Tickets/Tasks/TasksTable";
import { MainContent } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import type { BodyRow } from "@/components/ui/Table";
import {
  APPLICATION_TYPE_ITEMS,
  APPLICATION_TYPE_MAP,
  STATUS_ITEMS,
} from "@/shared/constants/tickets";
import { useBoundStore } from "@/store/store";
import { useApprovalListQuery } from "@/usecases/approvalRequests/reader";
import {
  useTicketStatusesQuery,
  useTicketTypesQuery,
} from "@/usecases/Tickets/reader";
import { dateFormatter, formatToISOString } from "@/utils/dateFormatter";

const PAGE_SIZE = 10 as const;

export const TasksContent = () => {
  const isLoading = useBoundStore((state) => state.isLoading);
  const navigate = useNavigate();

  const { data: ticketStatuses } = useTicketStatusesQuery();
  const { data: ticketTypes } = useTicketTypesQuery();

  const {
    ticketName,
    debouncedTicketName,
    applicationTypeCodes,
    statusTypeCodes,
    displayTicketId,
    debouncedDisplayTicketId,
    applicationDateFrom,
    applicationDateTo,
    userResolved,
    applicantUserId,
    applicantSearchQuery,
    currentPage,
    sortBy,
    users,
    handleChangeTicketName,
    handleChangeApplicationTypeCodes,
    handleChangeStatusTypeCodes,
    handleChangeDisplayTicketId,
    handleChangeApplicationDateFrom,
    handleChangeApplicationDateTo,
    handleChangeUserResolved,
    handleChangeApplicantUserId,
    handleChangeApplicantSearchQuery,
    handleChangeCurrentPage,
    handleChangeSortBy,
  } = useTasksSearch();

  const formattedISODateFrom = useMemo(() => {
    return applicationDateFrom ? formatToISOString(applicationDateFrom) : "";
  }, [applicationDateFrom]);

  const formattedISODateTo = useMemo(() => {
    return applicationDateTo ? formatToISOString(applicationDateTo) : "";
  }, [applicationDateTo]);

  const dateFormattedDateFrom = useMemo(() => {
    return applicationDateFrom ? dateFormatter(applicationDateFrom) : "";
  }, [applicationDateFrom]);

  const dateFormattedDateTo = useMemo(() => {
    return applicationDateTo ? dateFormatter(applicationDateTo) : "";
  }, [applicationDateTo]);

  const { data: tickets } = useApprovalListQuery({
    ticketNameContains: debouncedTicketName,
    ticketApplicationTypeCodes: applicationTypeCodes,
    userResolved: userResolved ? userResolved === "resolved" : undefined,
    ticketStatusTypeCodes: statusTypeCodes,
    applicantUserId,
    createdAtRange: {
      start: formattedISODateFrom,
      end: formattedISODateTo,
    },
    displayTicketId: debouncedDisplayTicketId,
    sortBy: sortBy,
    pageSize: PAGE_SIZE,
    page: currentPage,
  });

  const rows: BodyRow<ColumnKeys>[] = useMemo(
    () =>
      (tickets?.results ?? []).map((ticket) => {
        return {
          cells: {
            icon: getTicketStatusIcon(ticket.ticketStatusTypeCode),
            ticketName: ticket.ticketName,
            ticketApplicationTypeCode:
              APPLICATION_TYPE_MAP[ticket.ticketApplicationTypeCode],
            userResolved: getTaskResolvedBadge(ticket.userResolved),
            ticketStatusTypeCode: getTicketStatusBadge(
              ticket.ticketStatusTypeCode,
            ),
            applicantName: ticket.applicant.name,
            createdAt: dateFormatter(new Date(ticket.createdAt)),
            displayTicketId: ticket.displayTicketId,
          },
          id: ticket.ticketId,
        };
      }),
    [tickets],
  );

  const applicantSelectOptions = useMemo(
    () =>
      (users ?? []).map((user) => ({
        label: user.name,
        value: user.userId,
      })),
    [users],
  );

  const ticketStatusOptions = useMemo(
    () =>
      (ticketStatuses || [])
        .map((code) => STATUS_ITEMS.find((item) => item.value === code))
        .filter((item) => !!item),
    [ticketStatuses],
  );

  const applicationTypeOptions = useMemo(
    () =>
      (ticketTypes || [])
        .map((code) =>
          APPLICATION_TYPE_ITEMS.find((item) => item.value === code),
        )
        .filter((item) => !!item),
    [ticketTypes],
  );

  const navigateToTaskDetail = useCallback(
    (taskId: string) => {
      navigate(`/tickets/tasks/${taskId}`);
    },
    [navigate],
  );

  const handleRowDoubleClick = useCallback(
    (row: BodyRow<ColumnKeys>) => {
      navigateToTaskDetail(row.id);
    },
    [navigateToTaskDetail],
  );

  const handleTaskClick = useCallback(
    (rowId: string) => {
      navigateToTaskDetail(rowId);
    },
    [navigateToTaskDetail],
  );

  const cards: Card[] = useMemo(
    () =>
      (tickets?.results ?? []).map((ticket) => {
        return {
          id: ticket.ticketId,
          items: [
            {
              label: "チケット名",
              value: ticket.ticketName,
              onValueClick: (card) => handleTaskClick(card.id),
            },
            {
              label: "申請種類",
              value: APPLICATION_TYPE_MAP[ticket.ticketApplicationTypeCode],
            },
            {
              label: "対応状況",
              value: getTaskResolvedBadge(ticket.userResolved),
            },
            {
              label: "ステータス",
              value: getTicketStatusBadge(ticket.ticketStatusTypeCode),
            },
            { label: "申請者", value: ticket.applicant.name },
            {
              label: "申請日",
              value: dateFormatter(new Date(ticket.createdAt)),
            },
            {
              label: "ID",
              value: ticket.displayTicketId,
            },
          ],
          onCardClick: (card: Card) => handleTaskClick(card.id),
        };
      }),
    [tickets, handleTaskClick],
  );

  const SearchAreaProps = {
    applicantSearchQuery,
    applicantSelectOptions,
    applicationTypeOptions,
    ticketStatusOptions,
    applicantUserId,
    applicationDateFrom: dateFormattedDateFrom,
    applicationDateTo: dateFormattedDateTo,
    displayTicketId,
    onChangeApplicantSearchQuery: handleChangeApplicantSearchQuery,
    onChangeApplicantUserId: handleChangeApplicantUserId,
    onChangeApplicationDateFrom: handleChangeApplicationDateFrom,
    onChangeApplicationDateTo: handleChangeApplicationDateTo,
    onChangeDisplayTicketId: handleChangeDisplayTicketId,
    onChangeStatus: handleChangeStatusTypeCodes,
    onChangeTicketName: handleChangeTicketName,
    onChangeType: handleChangeApplicationTypeCodes,
    onChangeUserResolved: handleChangeUserResolved,
    status: statusTypeCodes,
    ticketName,
    type: applicationTypeCodes,
    userResolved,
  };

  const TasksTableProps = {
    currentPage: currentPage,
    maxPage: tickets?.totalPage ?? 1,
    onCellClick: handleTaskClick,
    onChangeCurrentPage: handleChangeCurrentPage,
    onRowDoubleClick: handleRowDoubleClick,
    onSort: handleChangeSortBy,
    rows: rows,
  };

  const TasksSummaryListProps: TaskSummaryListProps = {
    cards,
    pagination: {
      currentPage,
      maxPage: tickets?.totalPage ?? 1,
      onClick: handleChangeCurrentPage,
    },
  };

  return (
    <MainContent pageTitle="承認依頼一覧">
      <div className="hidden desktop:block">
        <TasksSearchArea {...SearchAreaProps} />
        <TasksTable {...TasksTableProps} />
      </div>
      <div className="desktop:hidden">
        <TasksSearchAreaMobile {...SearchAreaProps} />
        <TaskSummaryList {...TasksSummaryListProps} />
      </div>
      {isLoading && <SpinnerOverlay />}
    </MainContent>
  );
};
