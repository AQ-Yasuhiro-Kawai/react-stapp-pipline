import {
  Pagination,
  type PaginationProps,
} from "@/components/ui/Table/components/Pagination";
import { type Card, TaskSummaryCard } from "./TaskSummaryCard";

export type SummaryItemKeys = {
  ticketName: string;
  ticketApplicationTypeCode: string;
  userResolved: React.ReactNode;
  ticketStatusTypeCode: React.ReactNode;
  applicantName: string;
  createdAt: string;
  displayTicketId: string;
};

export type TaskSummaryListProps = {
  cards: Card[];
  pagination?: PaginationProps;
};

export const TaskSummaryList = ({
  cards,
  pagination,
}: TaskSummaryListProps) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {cards.length === 0 && <TaskSummaryCard />}
        {cards.map((card) => (
          <TaskSummaryCard card={card} key={card.id} />
        ))}
      </div>
      {pagination && (
        <div className="pb-10">
          <Pagination
            currentPage={pagination.currentPage}
            maxPage={pagination.maxPage}
            onClick={pagination.onClick}
          />
        </div>
      )}
    </div>
  );
};
