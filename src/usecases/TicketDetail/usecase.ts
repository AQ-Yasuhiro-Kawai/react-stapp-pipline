import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  type TicketDetailRepository,
  useTicketDetailRepository,
} from "@/repositories/TicketDetail/repository";
import { ticketDetailKeys } from "./cache";

/**
 * チケットステータスを更新するためのペイロードの型
 */
type UpdateTicketStatusPayload = {
  ticketId: string;
  actionCode: "withdraw" | "pull_back";
};

/**
 * チケット詳細のWrite系Usecaseを生成するファクトリ関数
 * @param repository リポジトリのインスタンス
 * @param queryClient TanStack Query のクライアントインスタンス
 */
const createTicketDetailUsecase = ({
  repository,
  queryClient,
}: {
  repository: TicketDetailRepository;
  queryClient: ReturnType<typeof useQueryClient>;
}) => {
  return {
    /**
     * チケットのステータスを更新
     * @param payload 更新に必要な情報 (ticketId, actionCode)
     */
    updateTicketStatus: async (payload: UpdateTicketStatusPayload) => {
      try {
        const updatedTicketData = await repository.updateTicketStatus(
          payload.ticketId,
          payload.actionCode,
        );

        const queryKey = ticketDetailKeys.detail(updatedTicketData.ticket_id);
        queryClient.setQueryData(queryKey, updatedTicketData);

        return updatedTicketData;
      } catch (error) {
        console.error("Usecase error updating ticket status:", error);
        throw error;
      }
    },
  };
};

/**
 * チケット詳細のWrite系Usecaseのインスタンスを生成するためのカスタムフック
 */
export const useTicketDetailUsecase = () => {
  const repository = useTicketDetailRepository();
  const queryClient = useQueryClient();

  return useMemo(
    () => createTicketDetailUsecase({ repository, queryClient }),
    [repository, queryClient],
  );
};
