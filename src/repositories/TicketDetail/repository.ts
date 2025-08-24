import { useMemo } from "react";
import { api } from "@/lib/api";
import type { RawTicketDetail } from "./converter";

const createTicketDetailRepository = () => {
  return {
    /**
     * 指定されたIDのチケット詳細情報をAPIから取得
     */
    getTicketDetail: async (ticketId: string): Promise<RawTicketDetail> => {
      const url = `/api/tickets/${ticketId}`;
      const responseData = await api.get<RawTicketDetail>(url);
      return responseData;
    },

    /**
     * 指定されたIDのチケットのステータスを更新
     * @param ticketId 更新するチケットのID
     * @param actionCode 実行するアクションのコード
     */
    updateTicketStatus: async (
      ticketId: string,
      actionCode: "withdraw" | "pull_back",
    ): Promise<RawTicketDetail> => {
      const url = `/tickets/${ticketId}`;
      const body = { ticket_action_type_code: actionCode };
      const responseData = await api.post<RawTicketDetail>(url, body);
      return responseData;
    },
  };
};

/**
 * チケット詳細リポジトリのインスタンスを生成するためのカスタムフック
 */
export const useTicketDetailRepository = () => {
  return useMemo(() => createTicketDetailRepository(), []);
};

export type TicketDetailRepository = ReturnType<
  typeof createTicketDetailRepository
>;
