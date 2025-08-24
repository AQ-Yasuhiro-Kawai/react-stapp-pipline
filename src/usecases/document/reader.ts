import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import type {
  Document,
  DocumentDetail,
  DocumentFile,
  DocumentVersion,
  DocumentVersionDetail,
} from "@/components/domain/Documents/types";
import type { FileType } from "@/domain/tickets/Document/type";
import { useDocumentRepository } from "@/repositories/Documents/repository";
import type {
  DocumentDetailResponse,
  DocumentFileResponse,
  DocumentResponse,
  DocumentVersionDetailResponse,
  DocumentVersionResponse,
} from "@/repositories/Documents/type";
import { useOfficialDocumentRepository } from "@/repositories/Tickets/officialDocument/repository";
import type { FileTypesResponse } from "@/repositories/Tickets/officialDocument/type";
import { documentKeys } from "@/usecases/document/cache";
import { ticketsDocumentKeys } from "@/usecases/Tickets/Document/cache";

/**
 * IDを指定して単一の正文書詳細を取得
 */
export const useGetDocumentDetailQuery = (id: string | undefined) => {
  const repository = useDocumentRepository();

  return useSuspenseQuery<DocumentDetailResponse, Error, DocumentDetail>({
    queryKey: [...documentKeys.documentDetail, id],
    queryFn: () => {
      if (!id) {
        throw new Error("Document id is required");
      }
      return repository.getDocumentDetail(id);
    },
    select: (data: DocumentDetailResponse) =>
      camelcaseKeys(data, { deep: true }),
  });
};

/**
 * IDを指定して正文書の過去バージョン一覧を取得
 */
export const useGetDocumentVersionsQuery = (id: string | undefined) => {
  const repository = useDocumentRepository();

  return useSuspenseQuery<DocumentVersionResponse, Error, DocumentVersion>({
    queryKey: [...documentKeys.documentVersions, id],
    queryFn: () => {
      if (!id) {
        throw new Error("Document id is required");
      }
      return repository.getDocumentVersions(id);
    },
    select: (data: DocumentVersionResponse) =>
      camelcaseKeys(data, { deep: true }),
  });
};

/**
 * IDとバージョンIDを指定して正文書のバージョン詳細を取得
 */
export const useGetDocumentVersionDetailQuery = (
  documentId: string | undefined,
  versionId: string | undefined,
) => {
  const repository = useDocumentRepository();

  return useSuspenseQuery<
    DocumentVersionDetailResponse,
    Error,
    DocumentVersionDetail
  >({
    queryKey: [...documentKeys.documentVersionDetail, documentId, versionId],
    queryFn: () => {
      if (!documentId || !versionId) {
        throw new Error("Document id and version id are required");
      }
      return repository.getDocumentVersionDetail(documentId, versionId);
    },
    select: (data: DocumentVersionDetailResponse) =>
      camelcaseKeys(data, { deep: true }),
  });
};

/**
 * IDを指定して正文書のファイルを取得
 */
export const useGetDocumentFileMutation = () => {
  const repository = useDocumentRepository();

  return useMutation({
    mutationFn: (id: string) => repository.getDocumentFile(id),
  });
};

/**
 * 正文書一覧を取得
 */
export const useGetDocumentQuery = (
  searchWord: string,
  organizationCode: string,
  fileType: string,
  sortBy: string,
  pageSize: number,
  page: number,
) => {
  const repository = useDocumentRepository();

  return useQuery<DocumentResponse, Error, Document>({
    queryKey: [
      ...documentKeys.document,
      searchWord,
      organizationCode,
      fileType,
      sortBy,
      pageSize,
      page,
    ],
    queryFn: () =>
      repository.getDocuments(
        searchWord,
        organizationCode,
        fileType,
        sortBy,
        pageSize,
        page,
      ),
    select: (data) => camelcaseKeys(data, { deep: true }),
  });
};

/**
 * 正文書ファイル一覧を取得
 */
export const useGetDocumentFilesQuery = (
  searchWord: string,
  organizationCode: string,
  fileType: string,
  sortBy: string,
  pageSize: number,
  page: number,
) => {
  const repository = useDocumentRepository();

  return useQuery<DocumentFileResponse, Error, DocumentFile>({
    queryKey: [
      ...documentKeys.documentFiles,
      searchWord,
      organizationCode,
      fileType,
      sortBy,
      pageSize,
      page,
    ],
    queryFn: () =>
      repository.getDocumentFiles(
        searchWord,
        organizationCode,
        fileType,
        sortBy,
        pageSize,
        page,
      ),
    select: (data) => camelcaseKeys(data, { deep: true }),
  });
};

/**
 * 文書一覧を取得
 */
export const useGetDocumentTypesQuery = () => {
  const repository = useOfficialDocumentRepository();

  return useSuspenseQuery<FileTypesResponse, Error, FileType>({
    queryKey: ticketsDocumentKeys.fileType,
    queryFn: () => repository.getFileTypes(),
    select: (data) => camelcaseKeys(data, { deep: true }),
  });
};

/**
 * 部署一覧を取得
 */
export const useGetDepartmentsQuery = (id: string | null) => {
  const repositories = useDocumentRepository();

  return useQuery({
    queryKey: [...documentKeys.documentDepartments, id],
    queryFn: () => repositories.getDepartments(id),
    select: (data) => camelcaseKeys(data, { deep: true }),
  });
};
