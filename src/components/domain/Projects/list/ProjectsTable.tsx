import { useCallback, useMemo } from "react";
import type { ProjectView } from "@/components/domain/Projects/types/project";
import { Icon } from "@/components/ui/Icons";
import type { BodyRow, HeaderColumn } from "@/components/ui/Table";
import { Table } from "@/components/ui/Table";
import type { PaginationProps } from "@/components/ui/Table/components/Pagination";
import { SORTED_STATE } from "@/components/ui/Table/components/Table";
import type { OnSortType } from "@/components/ui/Table/hook/useTable";
import type { ProjectSite } from "@/domain/Projects/type";

type ProjectsTableProps = {
  projects: ProjectSite[];
  pagination: PaginationProps;
  onSort: OnSortType<keyof ProjectView>;
  onProjectNameClick: (projectId: string) => void;
  onRowDoubleClick: (projectId: string) => void;
};

export function ProjectsTable({
  projects,
  pagination,
  onSort,
  onProjectNameClick,
  onRowDoubleClick,
}: ProjectsTableProps) {
  const handleTableRowDoubleClick = useCallback(
    (row: BodyRow<ProjectView>) => {
      onRowDoubleClick(row.id);
    },
    [onRowDoubleClick],
  );

  const headerColumns: HeaderColumn<ProjectView, keyof ProjectView>[] =
    useMemo(() => {
      return [
        { children: "", className: "w-12", key: "icon" },
        {
          children: "プロジェクト名",
          className: "w-[400px] mr-10",
          key: "name",
          sorted: SORTED_STATE.UNSORTED,
          onCellClick: (row) => onProjectNameClick(row.id),
        },
        {
          children: "インポート元",
          className: "w-[160px]",
          key: "importSource",
        },
        {
          children: "プロジェクトの説明",
          key: "description",
        },
      ];
    }, [onProjectNameClick]);

  const bodyRows: BodyRow<ProjectView>[] = useMemo(() => {
    if (!projects) {
      return [];
    }

    return projects.map((project) => ({
      cells: {
        icon: <Icon type="sharePoint" />,
        name: project.projectName,
        importSource: project.storageLocationCode,
        description: project.description,
      },
      id: project.projectId,
    }));
  }, [projects]);

  return (
    <Table<ProjectView, keyof ProjectView>
      bodyRows={bodyRows}
      headerColumns={headerColumns}
      onRowDoubleClick={handleTableRowDoubleClick}
      onSort={onSort}
      pagination={pagination}
    />
  );
}
