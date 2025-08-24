/**
 * APIから帰ってくる生のプロジェクトの型
 */
type RawProject = {
  project_id: string;
  storage_location_code: string;
  project_name: string;
  created_at: string;
  description: string;
};

/**
 * APIから返ってくるレスポンス全体の型
 */
type RawProjectSitesResponse = {
  total_count: number;
  total_page: number;
  current_page: number;
  results: RawProject[];
};

type ProjectItemResponse = {
  site_id: string;
  drive_id: string;
  item_name: string;
  provider_item_id: string;
  parent_reference_path: string;
  url: string;
  last_modified_by: string;
  last_modified_at: string;
  version: string;
  size: number;
  extension: string;
  is_folder: boolean;
};

type ProjectGetResponse = {
  project_id: string;
  provider_name: string;
  project_name: string;
  created_at: string;
  description: string;
  items: ProjectItemResponse[];
};

type ProjectGetQueryParams = {
  provider_item_id?: string;
  site_id?: string;
  drive_id?: string;
};

type ConvertedPdfResponse = {
  request_id: string;
  provider_item_id: string;
  original_file_blob_url: string;
  generated_file_blob_url: string;
  file_content_hash: string;
};

type ConvertedPdfRequest = {
  drive_id: string;
  provider_item_id: string;
};

type ProjectListQueryParams = {
  project_name_contains?: string;
  sort_by?: string;
  page_size: string;
  current_page: string;
};

export type {
  ProjectGetResponse,
  ProjectGetQueryParams,
  ConvertedPdfResponse,
  ConvertedPdfRequest,
  RawProjectSitesResponse,
  ProjectListQueryParams,
};
