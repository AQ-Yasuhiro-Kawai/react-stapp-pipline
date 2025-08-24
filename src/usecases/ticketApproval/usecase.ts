import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  type TicketApprovalRepository,
  useTicketApprovalRepository,
} from "@/repositories/ticketApproval/repository";
import type { TicketApprovalPayload } from "@/repositories/ticketApproval/types";
import { approvalListKeys } from "@/usecases/approvalRequests/cache";

type MutatePayload = {
  ticketId: string;
} & TicketApprovalPayload;

/**
 * チケット承認のWrite系Usecaseを生成するファクトリ関数
 */
const createTicketApprovalUsecase = ({
  repository,
  queryClient,
}: {
  repository: TicketApprovalRepository;
  queryClient: ReturnType<typeof useQueryClient>;
}) => {
  return {
    useUpdateApprovalStatusMutation: () => {
      return useMutation({
        mutationFn: (payload: MutatePayload) =>
          repository.updateApprovalStatus(payload.ticketId, {
            approvalActionCode: payload.approvalActionCode,
            comment: payload.comment,
          }),

        onSuccess: () => {
          // 承認一覧のキャッシュを無効化して最新の状態に更新
          queryClient.invalidateQueries({ queryKey: approvalListKeys.lists() });
        },
      });
    },
  };
};

/**
 * チケット承認のWrite系Usecaseのインスタンスを生成するためのカスタムフック
 */
export const useTicketApprovalUsecase = () => {
  const repository = useTicketApprovalRepository();
  const queryClient = useQueryClient();

  return useMemo(
    () => createTicketApprovalUsecase({ repository, queryClient }),
    [repository, queryClient],
  );
};
