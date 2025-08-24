import { useMemo } from "react";
import type { Ticket, TicketListParams } from "@/domain/tickets/MyTicket/types";
import { api } from "@/lib/api";
import { convertToTicket, type RawTicket } from "./converter";

/**
 * APIから返ってくるレスポンス全体の型
 */
type RawTicketsResponse = {
  total_count: number;
  total_page: number;
  current_page: number;
  results: RawTicket[];
};

/**
 * チケット一覧APIからのレスポンスのドメインモデル
 */
export type PaginatedTicketsResponse = {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  results: Ticket[];
};

/**
 * クエリを構築するヘルパー関数
 * @param params UIから渡されるフィルター等のパラメータ
 * @returns 構築されたクエリ文字列 (例: "?page=1&status=draft")
 */
const buildQueryString = (params: TicketListParams): string => {
  const queryParams = new URLSearchParams();

  const paramMap = {
    ticketNameContains: "ticket_name_contains",
    displayTicketId: "display_ticket_id",
    sortBy: "sort_by",
    pageSize: "page_size",
    page: "page",
  };

  // 文字列または数値のパラメータを処理
  for (const [key, apiParam] of Object.entries(paramMap)) {
    const value = params[key as keyof typeof paramMap];
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(apiParam, String(value));
    }
  }

  // 配列のパラメータを処理
  if (params.applicationTypeCodes && params.applicationTypeCodes.length > 0) {
    params.applicationTypeCodes.forEach((code) =>
      queryParams.append("ticket_application_type_code", code),
    );
  }
  if (params.statusTypeCodes && params.statusTypeCodes.length > 0) {
    params.statusTypeCodes.forEach((code) =>
      queryParams.append("ticket_status_type_code", code),
    );
  }

  // 日付範囲のパラメータを処理
  if (params.createdAtRange?.start)
    queryParams.append("created_at_start", params.createdAtRange.start);
  if (params.createdAtRange?.end)
    queryParams.append("created_at_end", params.createdAtRange.end);
  if (params.completedAtRange?.start)
    queryParams.append("completed_at_start", params.completedAtRange.start);
  if (params.completedAtRange?.end)
    queryParams.append("completed_at_end", params.completedAtRange.end);

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * マイチケットリポジトリを生成するファクトリ関数
 */
const createMyTicketRepository = () => {
  return {
    getMyTickets: async (
      params: TicketListParams,
    ): Promise<PaginatedTicketsResponse> => {
      const queryString = buildQueryString(params);
      const url = `/api/tickets${queryString}`;

      try {
        const responseData = await api.get<RawTicketsResponse>(url);
        const transformedResults = responseData.results.map(convertToTicket);

        return {
          totalCount: responseData.total_count,
          totalPage: responseData.total_page,
          currentPage: responseData.current_page,
          results: transformedResults,
        };
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
        throw new Error("チケットの取得に失敗しました。");
      }
    },
  };
};

export const useMyTicketRepository = () => {
  return useMemo(() => createMyTicketRepository(), []);
};

export type MyTicketRepository = ReturnType<typeof createMyTicketRepository>;
