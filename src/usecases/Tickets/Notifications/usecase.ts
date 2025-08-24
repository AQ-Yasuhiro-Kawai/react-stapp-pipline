import { useMutation } from "@tanstack/react-query";
import { useTicketNotificationsRepository } from "@/repositories/Tickets/Notifications/repository";

/**
 * ワークフロー関連通知既読状態更新
 */
export const useTicketNotificationsAllMarkRead = () => {
  const repository = useTicketNotificationsRepository();

  return useMutation({
    mutationFn: () => repository.markAllRead(),
    onError: (error: unknown) => {
      console.error("ワークフロー関連通知既読状態更新に失敗しました。", error);
    },
  });
};
