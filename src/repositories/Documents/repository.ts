import { useMemo } from "react";
import { dummyDepartments } from "@/components/domain/Documents/dummyData.tsx";
import type { Department } from "@/components/domain/Documents/types";
import { type ApiClient, api } from "@/lib/api";
import type {
  DocumentDetailResponse,
  DocumentFileResponse,
  DocumentResponse,
  DocumentVersionDetailResponse,
  DocumentVersionResponse,
} from "@/repositories/Documents/type";

const createDocumentRepository = (api: ApiClient) => {
  return {
    // 正文書詳細を取得する
    getDocumentDetail: async (documentId: string) => {
      return await api.get<DocumentDetailResponse>(
        `/api/documents/${documentId}`,
      );
    },
    // 正文書バージョン一覧を取得する
    getDocumentVersions: async (id: string) => {
      const data = await api.get<DocumentVersionResponse>(
        `/api/document-versions/${id}`,
      );

      return data;
    },
    // 正文書バージョン詳細を取得する
    getDocumentVersionDetail: async (documentId: string, versionId: string) => {
      const data = await api.get<DocumentVersionDetailResponse>(
        `/api/document-versions/${documentId}/${versionId}`,
      );

      return data;
    },
    // 正文書ファイル（PDF）を取得する
    getDocumentFile: async (documentId: string) => {
      return await api.getBlob(`/api/documents/files/${documentId}`);
    },
    // 正文書一覧を取得する
    getDocuments: async (
      searchWord: string,
      organizationCode: string,
      fileType: string,
      sortBy: string,
      pageSize: number,
      page: number,
    ) => {
      const params = new URLSearchParams({
        page_size: String(pageSize),
        page: String(page),
        ...(searchWord && { official_document_name_contains: searchWord }),
        ...(organizationCode && {
          publication_source_organization_code: organizationCode,
        }),
        ...(fileType && { file_type: fileType }),
        ...(sortBy && { sort_by: sortBy }),
      });

      return await api.get<DocumentResponse>(
        `/api/documents?${params.toString()}`,
      );
    },
    // 正文書ファイル一覧を取得する
    getDocumentFiles: async (
      searchWord: string,
      organizationCode: string,
      fileType: string,
      sortBy: string,
      pageSize: number,
      page: number,
    ) => {
      const params = new URLSearchParams({
        page_size: String(pageSize),
        page: String(page),
        ...(searchWord && { document_file_name_contains: searchWord }),
        ...(organizationCode && {
          publication_source_organization_code: organizationCode,
        }),
        ...(fileType && { file_type: fileType }),
        ...(sortBy && { sort_by: sortBy }),
      });

      return await api.get<DocumentFileResponse>(
        `/api/documents/files?${params.toString()}`,
      );
    },
    // 部署一覧を取得する
    // TODO: API定義書にないので、実装は仮
    getDepartments: async (parentId: string | null): Promise<Department[]> => {
      return new Promise((resolve) => {
        // ネットワーク遅延をシミュレート
        setTimeout(() => {
          const children = dummyDepartments.filter(
            (dept) => dept.parentId === parentId,
          );
          resolve(children);
        }, 500);
      });
    },
  };
};

export const useDocumentRepository = () => {
  return useMemo(() => createDocumentRepository(api), []);
};

export type DocumentRepository = ReturnType<typeof createDocumentRepository>;
