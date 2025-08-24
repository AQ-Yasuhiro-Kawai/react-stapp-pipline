import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { DocumentsDepartmentList } from "@/components/domain/Documents/DocumentsDepartmentList";
import { DocumentsFileTable } from "@/components/domain/Documents/DocumentsFileTable";
import { DocumentsSearchArea } from "@/components/domain/Documents/DocumentsSearchArea";
import { DocumentsTable } from "@/components/domain/Documents/DocumentsTable";
import { useDocumentSearch } from "@/components/domain/Documents/hooks/useDocumentSearch";
import type { Department } from "@/components/domain/Documents/types";
import { MainContent } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { usePdfPreview } from "@/hooks/usePdfPreview";
import { useBoundStore } from "@/store/store";
import { useGetDocumentTypesQuery } from "@/usecases/document/reader";

export const DocumentsPage = () => {
  const navigate = useNavigate();
  const isLoading = useBoundStore((state) => state.isLoading);
  const { openPreview } = usePdfPreview();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const lastSelectedId =
    selectedIds.length > 0 ? selectedIds[selectedIds.length - 1] : null;

  const {
    searchWord,
    debouncedSearchWord,
    searchType,
    handleSearchWordChange,
    handleSearchTypeChange,
  } = useDocumentSearch();

  // 部署選択のハンドラ
  const handleSelectDepartment = useCallback(
    (dept: Department, level: number) => {
      setSelectedIds((prevIds) => {
        const newSelectedIds = [...prevIds.slice(0, level), dept.id];
        return newSelectedIds;
      });
    },
    [],
  );
  const handleClearDepartment = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const { data: documentTypes } = useGetDocumentTypesQuery();

  // 文書種類のフィルタを生成
  const documentTypeFilter = useMemo(() => {
    if (!lastSelectedId || !documentTypes) {
      return [];
    }

    const orgTypes = documentTypes.organizationFileTypes.find(
      (item) => item.organization.code === lastSelectedId,
    );

    if (!orgTypes) {
      return [];
    }

    return orgTypes.supportedDocumentTypes.map((type) => ({
      label: type,
      value: type,
    }));
  }, [lastSelectedId, documentTypes]);

  // 文書テーブルのハンドラ
  const handleDocumentRowDoubleClick = useCallback(
    (id: string) => {
      navigate(`/documents/${id}`);
    },
    [navigate],
  );
  const handleDocumentItemClick = useCallback(
    (id: string) => {
      navigate(`/documents/${id}`);
    },
    [navigate],
  );

  // ファイルテーブルのハンドラ
  const handleDocumentFileRowDoubleClick = useCallback(
    (id: string) => {
      openPreview(id);
    },
    [openPreview],
  );
  const handleDocumentFileItemClick = useCallback(
    (id: string) => {
      openPreview(id);
    },
    [openPreview],
  );
  const handleDetailClick = useCallback(
    (id: string) => {
      navigate(`/documents/${id}`);
    },
    [navigate],
  );

  return (
    <MainContent pageTitle="正文書一覧">
      <DocumentsSearchArea
        onSearchTypeChange={handleSearchTypeChange}
        onSearchWordChange={handleSearchWordChange}
        searchType={searchType}
        searchWord={searchWord}
      />
      <DocumentsDepartmentList
        onClear={handleClearDepartment}
        onSelect={handleSelectDepartment}
        selectedIds={selectedIds}
      />
      {searchType === "document" && (
        <DocumentsTable
          departmentId={lastSelectedId}
          documentTypeFilter={documentTypeFilter}
          onItemClick={handleDocumentItemClick}
          onRowDoubleClick={handleDocumentRowDoubleClick}
          searchWord={debouncedSearchWord}
        />
      )}
      {searchType === "file" && (
        <DocumentsFileTable
          departmentId={lastSelectedId}
          documentTypeFilter={documentTypeFilter}
          onDetailClick={handleDetailClick}
          onItemClick={handleDocumentFileItemClick}
          onRowDoubleClick={handleDocumentFileRowDoubleClick}
          searchWord={debouncedSearchWord}
        />
      )}

      {isLoading && <SpinnerOverlay />}
    </MainContent>
  );
};
