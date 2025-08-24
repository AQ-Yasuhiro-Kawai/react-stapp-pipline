import { useQuery } from "@tanstack/react-query";
import type { ApprovalListParams } from "@/domain/approvalRequests/types";
import {
  convertToApprovalTicket,
  type RawApprovalTicketsResponse,
} from "@/repositories/approvalRequests/converter";
import { useApprovalRepository } from "@/repositories/approvalRequests/repository";
import type { PaginatedApprovalTicketsResponse } from "@/repositories/approvalRequests/types";
import { approvalListKeys } from "./cache";

/**
 * 承認一覧を取得するカスタムフック
 * @param params フィルター、ソート、ページネーションのパラメーター
 */
export const useApprovalListQuery = (params: ApprovalListParams) => {
  const repository = useApprovalRepository();

  return useQuery<
    RawApprovalTicketsResponse,
    Error,
    PaginatedApprovalTicketsResponse
  >({
    queryKey: approvalListKeys.list(params),
    queryFn: () => repository.getApprovalList(params),
    select: (data) => ({
      totalCount: data.total_count,
      totalPage: data.total_page,
      currentPage: data.current_page,
      results: data.results.map(convertToApprovalTicket),
    }),
  });
};
