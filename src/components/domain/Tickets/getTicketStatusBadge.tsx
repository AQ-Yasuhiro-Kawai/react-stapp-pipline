import type { TicketStatusTypeCode } from "@/domain/tickets/types";
import { STATUS_MAP } from "@/shared/constants/tickets";
import { cn } from "@/utils/cn";

export const getTicketStatusBadge = (status: TicketStatusTypeCode) => {
  return (
    <span
      className={cn(
        "inline-flex h-[25px] px-2 py-1 justify-center items-center rounded-md text-sm font-bold text-main-bg",
        status === "draft" && "bg-sub-text",
        status === "on_approval" && "bg-main-blue",
        status === "reject" && "bg-main-red",
        status === "withdraw" && "bg-main-text",
        status === "completed" && "bg-main-green",
      )}
    >
      {STATUS_MAP[status]}
    </span>
  );
};
