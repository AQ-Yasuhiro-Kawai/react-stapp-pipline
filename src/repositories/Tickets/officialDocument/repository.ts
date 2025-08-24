import { useMemo } from "react";
import snakecaseKeys from "snakecase-keys";
import { type ApiClient, api } from "@/lib/api";
import type {
  ApprovalTemplatesDetailResponse,
  ApprovalTemplatesResponse,
  ApprovalTemplatesSearchQueryParam,
  ChildOrganizationsResponse,
  FileTypesResponse,
  OfficialDocumentTicketPostRequest,
  TargetOrganizationsResponse,
} from "./type";

const buildQueryString = <T extends Record<string, string>>(
  params: T,
): string => {
  const snakeCasedParams = snakecaseKeys(params, { deep: true });
  const queryParams = new URLSearchParams();
  Object.entries(snakeCasedParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });
  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : ""; // クエリ文字列が空でない場合に `?` を付与
};

const createOfficialDocumentRepository = (api: ApiClient) => {
  return {
    // 文書種類
    getFileTypes: async () => {
      const data = await api.get<FileTypesResponse>("/api/file-types");

      return data;
    },
    // 管理元組織
    getSourceOrganizations: async () => {
      const data = await api.get<ChildOrganizationsResponse>(
        "/api/source-organizations",
      );

      return data;
    },
    // 公開先組織
    getTargetOrganizations: async () => {
      const data = await api.get<TargetOrganizationsResponse>(
        "/api/target-organizations",
      );

      return data;
    },
    // 承認ルートテンプレート
    getApprovalTemplates: async (params: ApprovalTemplatesSearchQueryParam) => {
      const queryString = buildQueryString<ApprovalTemplatesSearchQueryParam>(
        params || {},
      );
      const data = await api.get<ApprovalTemplatesResponse>(
        `/api/approval-templates${queryString}`,
      );

      return data;
    },
    // API-004-12 承認ルートテンプレート詳細取得API
    getApprovalTemplateDetail: async (templateId: string) => {
      const data = await api.get<ApprovalTemplatesDetailResponse>(
        `/api/approval-templates/${templateId}`,
      );

      return data;
    },

    // チケット作成
    postOfficialDocumentTickets: async (
      payload: OfficialDocumentTicketPostRequest,
    ) => {
      const data = await api.post<never, OfficialDocumentTicketPostRequest>(
        "/api/tickets",
        payload,
      );

      return data;
    },
  };
};

export const useOfficialDocumentRepository = () => {
  return useMemo(() => createOfficialDocumentRepository(api), []);
};

export type AuthRepository = ReturnType<
  typeof createOfficialDocumentRepository
>;
