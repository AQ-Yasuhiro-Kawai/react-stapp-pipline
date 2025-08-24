import { useMemo } from "react";
import type { ApprovalListParams } from "@/domain/approvalRequests/types";
import { api } from "@/lib/api";
import type { RawApprovalTicketsResponse } from "./converter";

/**
 * 承認一覧のクエリ文字列を構築
 * @param params UIから渡されるフィルター等のパラメータ
 * @returns 構築されたクエリ文字列 (例: "?page=1&user_resolved=true")
 */
const buildApprovalListQuery = (params: ApprovalListParams): string => {
  const queryParams = new URLSearchParams();
  const paramMap = {
    ticketNameContains: "ticket_name_contains",
    applicantUserId: "applicant_user_id",
    displayTicketId: "display_ticket_id",
    sortBy: "sort_by",
    pageSize: "page_size",
    page: "page",
  };

  for (const [key, apiParam] of Object.entries(paramMap)) {
    const value = params[key as keyof typeof paramMap];
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(apiParam, String(value));
    }
  }

  if (
    params.ticketApplicationTypeCodes &&
    params.ticketApplicationTypeCodes.length > 0
  ) {
    params.ticketApplicationTypeCodes.forEach((code) => {
      queryParams.append("ticket_application_type_code", code);
    });
  }

  if (params.ticketStatusTypeCodes && params.ticketStatusTypeCodes.length > 0) {
    params.ticketStatusTypeCodes.forEach((code) => {
      queryParams.append("ticket_status_type_code", code);
    });
  }

  if (params.userResolved !== undefined) {
    queryParams.append("user_resolved", String(params.userResolved));
  }

  if (params.createdAtRange?.start) {
    queryParams.append("created_at_start", params.createdAtRange.start);
  }
  if (params.createdAtRange?.end) {
    queryParams.append("created_at_end", params.createdAtRange.end);
  }

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * 承認一覧リポジトリを生成するファクトリ関数
 */
const createApprovalRepository = () => {
  return {
    /**
     * 承認一覧を取得
     * @param params 絞り込みやソート、ページネーションのパラメーター
     */
    getApprovalList: async (
      params: ApprovalListParams,
    ): Promise<RawApprovalTicketsResponse> => {
      const url = `/api/tickets/tasks${buildApprovalListQuery(params)}`;
      const responseData = await api.get<RawApprovalTicketsResponse>(url);
      return responseData;
    },
  };
};

export const useApprovalRepository = () => {
  return useMemo(() => createApprovalRepository(), []);
};

export type ApprovalRepository = ReturnType<typeof createApprovalRepository>;
