import { useMemo } from "react";
import { type ApiClient, api } from "@/lib/api";
import type {
  TicketApplicationTypesResponse,
  TicketStatusesResponse,
} from "./type";

const createTicketRepository = (api: ApiClient) => {
  return {
    // チケットのステータス一覧
    getTicketStatuses: async () => {
      const data = await api.get<TicketStatusesResponse>(
        "/api/ticket-statuses",
      );
      return data;
    },
    // チケットの申請種類一覧
    getTicketTypes: async () => {
      const data =
        await api.get<TicketApplicationTypesResponse>("/api/ticket-types");
      return data;
    },
  };
};

export const useTicketRepository = () => {
  return useMemo(() => createTicketRepository(api), []);
};

export type TicketRepository = ReturnType<typeof createTicketRepository>;
