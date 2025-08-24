import { useMemo } from "react";
import { type ApiClient, api } from "@/lib/api";
import type { NotificationsResponse } from "./type";

const createNotificationsRepository = (api: ApiClient) => {
  return {
    // お知らせ一覧取得
    getNotifications: async () => {
      const data = await api.get<NotificationsResponse>("/api/notifications");
      return data;
    },
  };
};

export const useNotificationsRepository = () => {
  return useMemo(() => createNotificationsRepository(api), []);
};
