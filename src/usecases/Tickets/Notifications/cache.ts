import type { TicketNotificationsParams } from "@/domain/tickets/Notifications/type";

export const ticketNotificationsKeys = {
  all: ["ticketNotifications"] as const,
  lists: () => [...ticketNotificationsKeys.all, "list"] as const,
  list: (params: TicketNotificationsParams) =>
    [...ticketNotificationsKeys.lists(), params] as const,
};
