import { useMemo } from "react";
import { api } from "@/lib/api";
import type { TicketApprovalPayload } from "./types";

const createTicketApprovalRepository = () => {
  return {
    /**
     * チケットを承認または差し戻し
     * @param ticketId 操作対象のチケットID
     * @param payload リクエストボディ (アクションコードとコメント)
     */
    updateApprovalStatus: async (
      ticketId: string,
      payload: TicketApprovalPayload,
    ) => {
      const url = `/api/tickets/tasks/${ticketId}`;

      const body = {
        approval_action_code: payload.approvalActionCode,
        comment: payload.comment,
      };

      // 成功時は204 No Contentが返るためvoid
      await api.post<void>(url, body);
    },
  };
};

/**
 * チケット承認リポジトリのインスタンスを生成するためのカスタムフック
 */
export const useTicketApprovalRepository = () => {
  return useMemo(() => createTicketApprovalRepository(), []);
};

export type TicketApprovalRepository = ReturnType<
  typeof createTicketApprovalRepository
>;
