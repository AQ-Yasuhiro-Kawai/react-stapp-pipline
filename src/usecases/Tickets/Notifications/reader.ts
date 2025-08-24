import { useSuspenseQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import type {
  TicketNotifications,
  TicketNotificationsParams,
} from "@/domain/tickets/Notifications/type";
import { useTicketNotificationsRepository } from "@/repositories/Tickets/Notifications/repository";
import type { TicketNotificationsResponse } from "@/repositories/Tickets/Notifications/type";
import { ticketNotificationsKeys } from "./cache";

/**
 * ワークフロー関連通知一覧取得
 */
export const useTicketNotificationsQuery = (
  params: TicketNotificationsParams,
) => {
  const repository = useTicketNotificationsRepository();

  return useSuspenseQuery({
    queryKey: ticketNotificationsKeys.list(params),
    queryFn: () => repository.getNotifications(params),
    select: (data: TicketNotificationsResponse): TicketNotifications =>
      camelcaseKeys(data, { deep: true }),
  });
};
