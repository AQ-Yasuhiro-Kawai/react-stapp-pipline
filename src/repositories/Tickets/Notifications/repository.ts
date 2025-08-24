import { useMemo } from "react";
import snakecaseKeys from "snakecase-keys";
import type { TicketNotificationsParams } from "@/domain/tickets/Notifications/type";
import { type ApiClient, api } from "@/lib/api";
import type {
  TicketNotificationsRequestParams,
  TicketNotificationsResponse,
} from "./type";

/**
 * クエリ文字列を構築するヘルパー関数
 */
const buildQueryString = (params: TicketNotificationsRequestParams): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();

  return queryString ? `?${queryString}` : "";
};

const createTicketNotificationsRepository = (api: ApiClient) => {
  return {
    // ワークフロー関連通知一覧取得
    getNotifications: async (params: TicketNotificationsParams) => {
      const snakeCaseParams = snakecaseKeys(params);
      const queryString = buildQueryString(snakeCaseParams);

      const data = await api.get<TicketNotificationsResponse>(
        `/api/tickets/notifications/${queryString}`,
      );

      return data;
    },
    // ワークフロー関連通知既読状態更新
    markAllRead: async () => {
      const data = await api.post("/api/tickets/notifications/mark-all-read");

      return data;
    },
  };
};

export const useTicketNotificationsRepository = () => {
  return useMemo(() => createTicketNotificationsRepository(api), []);
};
