import type { TicketListParams } from "@/domain/tickets/MyTicket/types";

export const myTicketsKeys = {
  all: ["myTickets"] as const,
  lists: () => [...myTicketsKeys.all, "list"] as const,
  list: (params: TicketListParams) =>
    [...myTicketsKeys.lists(), params] as const,
};
