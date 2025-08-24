import { useMemo } from "react";
import snakecaseKeys from "snakecase-keys";
import type { ProjectListParams } from "@/domain/Projects/type";
import { type ApiClient, api } from "@/lib/api";
import type {
  ConvertedPdfRequest,
  ConvertedPdfResponse,
  ProjectGetQueryParams,
  ProjectGetResponse,
  ProjectListQueryParams,
  RawProjectSitesResponse,
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

/**
 * プロジェクト一覧リポジトリを生成するファクトリ関数
 */
const createProjectsRepository = (api: ApiClient) => {
  return {
    getProjectsList: async (
      params: ProjectListParams,
    ): Promise<RawProjectSitesResponse> => {
      const snakeParam = snakecaseKeys(params, { deep: true });
      const queryString = buildQueryString<ProjectListQueryParams>({
        ...snakeParam,
        page_size: String(snakeParam.page_size),
        current_page: String(snakeParam.current_page),
      });
      const url = `/api/projects${queryString}`;
      const responseData = await api.get<RawProjectSitesResponse>(url);

      return responseData;
    },
    // DP内のプロジェクト配下フォルダ、ファイル一覧を取得する
    getProjectDetails: async (
      projectId: string,
      params?: ProjectGetQueryParams,
    ) => {
      const queryString = buildQueryString<ProjectGetQueryParams>(params || {});
      const data = await api.get<ProjectGetResponse>(
        `/api/projects/${projectId}${queryString}`,
      );
      return data;
    },
    // PDF変換リクエスト
    requestPdfConversion: async (request: ConvertedPdfRequest) => {
      const data = await api.post<ConvertedPdfResponse>("/api/pdf", request);
      return data;
    },
  };
};

export const useProjectsRepository = () => {
  return useMemo(() => createProjectsRepository(api), []);
};

export type ProjectsRepository = ReturnType<typeof createProjectsRepository>;
