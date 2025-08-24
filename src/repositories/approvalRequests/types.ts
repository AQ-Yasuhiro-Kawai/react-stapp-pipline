import type { ApprovalTicket } from "@/domain/approvalRequests/types";

/**
 * 承認一覧APIが返すレスポンスの型
 */
export type PaginatedApprovalTicketsResponse = {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  results: ApprovalTicket[];
};
