type ProjectItem = {
  siteId: string;
  driveId: string;
  itemName: string;
  providerItemId: string;
  parentReferencePath: string;
  url: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
  version: string;
  size: number;
  extension: string;
  isFolder: boolean;
};

type Project = {
  projectId: string;
  providerName: string;
  projectName: string;
  createdAt: string;
  description: string;
  items: ProjectItem[];
};

type ConvertedPdf = {
  requestId: string;
  providerItemId: string;
  originalFileBlobUrl: string;
  generatedFileBlobUrl: string;
  fileContentHash: string;
};

/**
 * プロジェクト一覧で表示されるプロジェクト単体の型
 */
export type ProjectSite = {
  projectId: string;
  storageLocationCode: string;
  projectName: string;
  createdAt: string;
  description: string;
};

/**
 * APIから返ってくるレスポンスをcamelCaseに変換したプロジェクト一覧の型
 */
export type ProjectSitesResponse = {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  results: ProjectSite[];
};

/**
 * プロジェクト一覧を取得するためのパラメーターの型
 */
export type ProjectListParams = {
  projectNameContains?: string;
  sortBy?: string;
  pageSize: number;
  currentPage: number;
};

type PdfConversionRequest = {
  driveId: ProjectItem["driveId"];
  providerItemId: ProjectItem["providerItemId"];
};

export type { Project, ConvertedPdf, PdfConversionRequest };
