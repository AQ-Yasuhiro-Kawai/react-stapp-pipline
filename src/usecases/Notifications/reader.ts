import { useSuspenseQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import type { Notifications } from "@/domain/Notifications/type";
import { useNotificationsRepository } from "@/repositories/Notifications/repository";
import type { NotificationsResponse } from "@/repositories/Notifications/type";
import { notificationsKeys } from "./cache";

/**
 * お知らせ一覧取得
 */
export const useNotificationsQuery = () => {
  const repository = useNotificationsRepository();

  return useSuspenseQuery({
    queryKey: notificationsKeys.all,
    queryFn: () => repository.getNotifications(),
    select: (data: NotificationsResponse): Notifications =>
      camelcaseKeys(data, { deep: true }),
  });
};
