import type { ProjectListParams } from "@/domain/Projects/type";

export const projectListKeys = {
  all: ["projectList"] as const,
  lists: () => [...projectListKeys.all, "list"] as const,
  list: (params: ProjectListParams) =>
    [...projectListKeys.lists(), params] as const,
  projectDetails: ["projectDetails"] as const,
  projectDetailsWithQuery: (params: {
    providerItemId?: string;
    siteId?: string;
    driveId?: string;
  }) => [...projectListKeys.projectDetails, params] as const,
};
