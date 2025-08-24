import {
  ProjectSearchInput,
  ProjectsHeader,
  ProjectsTable,
} from "@components/domain/Projects/list";
import { AppLayout, MainContent } from "@components/ui/Layout";
import { Suspense, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import type { Project } from "@/components/domain/Projects/types/project";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import type { OnSortType } from "@/components/ui/Table/hook/useTable";
import useDebounce from "@/hooks/useDebounce";
import { useBoundStore } from "@/store/store";
import { useProjectListQuery } from "@/usecases/Projects/reader";

const ProjectsContent = () => {
  const navigate = useNavigate();
  const isLoading = useBoundStore((state) => state.isLoading);
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortParams, setSortParams] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const updateDebouncedSearchWord = (value: string) => {
    setDebouncedSearchWord(value);
  };
  useDebounce(updateDebouncedSearchWord, searchWord, 500);

  const { data: projects } = useProjectListQuery({
    projectNameContains: debouncedSearchWord,
    sortBy: sortParams ? `${sortParams.key}:${sortParams.direction}` : "",
    pageSize: 10,
    currentPage,
  });
  const maxPage = projects?.totalPage ?? 0;

  const handleSort: OnSortType<keyof Project | "icon"> = useCallback(
    ({ key, direction }) => {
      setSortParams({ key, direction });
    },
    [],
  );
  const handleSearchWordChange = useCallback((value: string) => {
    setSearchWord(value);
  }, []);

  const handleProjectNameClick = useCallback(
    (projectId: string) => {
      navigate(`/projects/${projectId}`);
    },
    [navigate],
  );

  const handleTableRowDoubleClick = useCallback(
    (projectId: string) => {
      navigate(`/projects/${projectId}`);
    },
    [navigate],
  );

  return (
    <MainContent pageTitle="プロジェクト一覧">
      <ProjectsHeader />
      <ProjectSearchInput
        onSearchWordChange={handleSearchWordChange}
        searchWord={searchWord}
      />
      <div className="mt-6">
        <ProjectsTable
          onProjectNameClick={handleProjectNameClick}
          onRowDoubleClick={handleTableRowDoubleClick}
          onSort={handleSort}
          pagination={{
            currentPage: currentPage,
            maxPage: maxPage,
            onClick: setCurrentPage,
          }}
          projects={projects?.results ?? []}
        />
      </div>
      {isLoading && <SpinnerOverlay />}
    </MainContent>
  );
};

export function ProjectsPage() {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <ProjectsContent />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
}
