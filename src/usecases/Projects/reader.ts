import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import type {
  Project,
  ProjectListParams,
  ProjectSitesResponse,
} from "@/domain/Projects/type";
import { useProjectsRepository } from "@/repositories/Projects/repository";
import type {
  ProjectGetResponse,
  RawProjectSitesResponse,
} from "@/repositories/Projects/type";
import { projectListKeys } from "./cache";

/**
 * プロジェクト一覧を取得するためのカスタムフック
 * @param params フィルター、ソート、ページネーションのパラメーター
 */
export const useProjectListQuery = (params: ProjectListParams) => {
  const repository = useProjectsRepository();

  return useQuery<RawProjectSitesResponse, Error, ProjectSitesResponse>({
    queryKey: projectListKeys.list(params),
    queryFn: async () => {
      const result = await repository.getProjectsList(params);
      return result;
    },
    select: (data: RawProjectSitesResponse) =>
      camelcaseKeys(data, { deep: true }),
  });
};

/**
 * ProjectIdの型を保証するアサーション関数
 */
function assertProjectId(value: string): asserts value is Project["projectId"] {
  if (typeof value !== "string") {
    throw new Error("Invalid ProjectId");
  }
}

export type ProjectQueryParams = {
  providerItemId?: string;
  siteId?: string;
  driveId?: string;
};

/**
 * プロジェクトIDを指定してフォルダ、ファイル一覧を取得
 */
export const useGetProjectDetailsSuspenseQuery = (
  projectId: string | undefined,
  params?: ProjectQueryParams,
) => {
  const repository = useProjectsRepository();

  return useSuspenseQuery<ProjectGetResponse, Error, Project>({
    queryKey: projectListKeys.projectDetailsWithQuery(params || {}),
    queryFn: () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return repository.getProjectDetails(projectId);
    },
    select: (data: ProjectGetResponse) => {
      assertProjectId(data.project_id);
      const transformedData: Project = {
        ...camelcaseKeys(data, { deep: true }),
        projectId: data.project_id,
      };
      return transformedData;
    },
  });
};

export const useGetProjectDetailsQuery = (
  projectId: string | undefined,
  params?: ProjectQueryParams,
) => {
  const repository = useProjectsRepository();

  return useQuery<ProjectGetResponse, Error, Project>({
    queryKey: projectListKeys.projectDetailsWithQuery(params || {}),
    queryFn: () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      const snakeParams = snakecaseKeys(params || {});
      return repository.getProjectDetails(projectId, snakeParams);
    },
    select: (data: ProjectGetResponse) => {
      assertProjectId(data.project_id);
      const transformedData: Project = {
        ...camelcaseKeys(data, { deep: true }),
        projectId: data.project_id,
      };
      return transformedData;
    },
  });
};
