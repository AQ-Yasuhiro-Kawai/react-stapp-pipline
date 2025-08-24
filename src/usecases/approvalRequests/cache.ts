import type { ApprovalListParams } from "@/domain/approvalRequests/types";

/**
 * 承認一覧関連のキャッシュキーを生成するためのキーファクトリ
 */
export const approvalListKeys = {
  all: ["approvalList"] as const,
  lists: () => [...approvalListKeys.all, "list"] as const,
  list: (params: ApprovalListParams) =>
    [...approvalListKeys.lists(), params] as const,
};
