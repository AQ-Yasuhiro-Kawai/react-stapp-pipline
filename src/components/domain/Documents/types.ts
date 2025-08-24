export type SearchType = "document" | "file";
export type filterList = {
  label: string;
  value: string;
}[];
export type Department = {
  id: string;
  name: string;
  hasChildren: boolean;
  parentId: string | null;
};

type User = {
  upn: string;
  name: string;
};

type StorageItem = {
  storageItemId: string;
  storageLocationUrl: string;
  fileName: string;
};

type DocumentItem = {
  id: string;
  beforeConversionItem: StorageItem;
  officialDocumentItem: StorageItem;
  projectId: string;
  originalSystemUrl: string;
  originalSystemFolderName: string;
  originalSystemFileName: string;
  originalSystemFileId: string;
  originalSystemLastUpdatedUser: string;
  originalSystemLastUpdatedAt: string;
  originalSystemVersion: string;
  documentId: string;
  documentBlobName: string;
};

type CodeName = {
  code: string;
  name: string;
};

type OfficialDocumentVersion = {
  id: string;
  version: number;
  updatedUser: string;
  updatedAt: string;
};

type DocumentVersionItem = {
  projectId: string;
  originalSystemUrl: string;
  originalSystemFolderName: string;
  originalSystemFileName: string;
  originalSystemFileId: string;
  originalSystemLastUpdatedAt: string;
  originalSystemVersion: string;
  id: string;
  beforeConversionItem: StorageItem;
  officialDocumentItem: StorageItem;
};

type DocumentListItem = {
  officialDocumentId: string;
  officialDocumentName: string;
  publicationTargetOrganizationCode: CodeName;
  publicationSourceOrganizationCode: CodeName;
  publicationScopeCode: CodeName;
  fileType: string;
  projectId: string;
  documentCreatedAt: string;
};

type DocumentFileListItem = {
  officialDocumentId: string;
  officialDocumentName: string;
  publicationTargetOrganizationCode: CodeName;
  publicationSourceOrganizationCode: CodeName;
  publicationScopeCode: CodeName;
  fileType: string;
  projectId: string;
  documentCreatedAt: string;
  documentId: string;
  officialDocumentFileName: string;
};

/** 正文書詳細 */
export type DocumentDetail = {
  officialDocumentId: string;
  officialDocumentName: string;
  publicationTargetOrganizationCode: CodeName;
  publicationSourceOrganizationCode: CodeName;
  publicationScopeCode: CodeName;
  fileType: string;
  applicant: User;
  approvedAt: string;
  officialDocumentItems: DocumentItem[];
};

/** 正文書バージョン一覧 */
export type DocumentVersion = {
  officialDocumentId: string;
  officialDocumentName: string;
  publicationTargetOrganizationCode: CodeName;
  publicationSourceOrganizationCode: CodeName;
  publicationScopeCode: CodeName;
  fileType: string;
  officialDocumentVersions: OfficialDocumentVersion[];
};

/** 正文書バージョン詳細 */
export type DocumentVersionDetail = {
  officialDocumentId: string;
  officialDocumentName: string;
  publicationTargetOrganizationCode: CodeName;
  publicationSourceOrganizationCode: CodeName;
  publicationScopeCode: CodeName;
  fileType: string;
  officialDocumentVersion: OfficialDocumentVersion;
  officialDocumentItems: DocumentVersionItem[];
};

/** 正文書一覧 */
export type Document = {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  results: DocumentListItem[];
};

/** 正文書ファイル一覧 */
export type DocumentFile = {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  results: DocumentFileListItem[];
};
