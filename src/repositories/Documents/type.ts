type User = {
  upn: string;
  name: string;
};

type StorageItem = {
  storage_item_id: string;
  storage_location_url: string;
  file_name: string;
};

type DocumentItem = {
  id: string;
  before_conversion_item: StorageItem;
  official_document_item: StorageItem;
  project_id: string;
  original_system_url: string;
  original_system_folder_name: string;
  original_system_file_name: string;
  original_system_file_id: string;
  original_system_last_updated_user: string;
  original_system_last_updated_at: string;
  original_system_version: string;
  document_id: string;
  document_blob_name: string;
};

type CodeName = {
  code: string;
  name: string;
};

type OfficialDocumentVersion = {
  id: string;
  version: number;
  updated_user: string;
  updated_at: string;
};

type DocumentVersionItem = {
  project_id: string;
  original_system_url: string;
  original_system_folder_name: string;
  original_system_file_name: string;
  original_system_file_id: string;
  original_system_last_updated_at: string;
  original_system_version: string;
  id: string;
  before_conversion_item: StorageItem;
  official_document_item: StorageItem;
};

type DocumentListItemResponse = {
  official_document_id: string;
  official_document_name: string;
  publication_target_organization_code: CodeName;
  publication_source_organization_code: CodeName;
  publication_scope_code: CodeName;
  file_type: string;
  project_id: string;
  document_created_at: string;
};

type DocumentFileListItemResponse = {
  official_document_id: string;
  official_document_name: string;
  publication_target_organization_code: CodeName;
  publication_source_organization_code: CodeName;
  publication_scope_code: CodeName;
  file_type: string;
  project_id: string;
  document_created_at: string;
  document_id: string;
  official_document_file_name: string;
};

/** 正文書詳細 */
export type DocumentDetailResponse = {
  official_document_id: string;
  official_document_name: string;
  publication_target_organization_code: CodeName;
  publication_source_organization_code: CodeName;
  publication_scope_code: CodeName;
  file_type: string;
  applicant: User;
  approved_at: string;
  official_document_items: DocumentItem[];
};

/** 正文書バージョン一覧 */
export type DocumentVersionResponse = {
  official_document_id: string;
  official_document_name: string;
  publication_target_organization_code: CodeName;
  publication_source_organization_code: CodeName;
  publication_scope_code: CodeName;
  file_type: string;
  official_document_versions: OfficialDocumentVersion[];
};

/** 正文書バージョン詳細 */
export type DocumentVersionDetailResponse = {
  official_document_id: string;
  official_document_name: string;
  publication_target_organization_code: CodeName;
  publication_source_organization_code: CodeName;
  publication_scope_code: CodeName;
  file_type: string;
  official_document_version: OfficialDocumentVersion;
  official_document_items: DocumentVersionItem[];
};

/** 正文書一覧 */
export type DocumentResponse = {
  total_count: number;
  total_page: number;
  current_page: number;
  results: DocumentListItemResponse[];
};

/** 正文書ファイル一覧 */
export type DocumentFileResponse = {
  total_count: number;
  total_page: number;
  current_page: number;
  results: DocumentFileListItemResponse[];
};
