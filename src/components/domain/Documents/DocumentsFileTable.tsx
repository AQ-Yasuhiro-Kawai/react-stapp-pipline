import { File, Info } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { filterList } from "@/components/domain/Documents/types";
import { Button } from "@/components/ui/Button";
import { type BodyRow, type HeaderColumn, Table } from "@/components/ui/Table";
import { SORTED_STATE } from "@/components/ui/Table/components/Table";
import type {
  FilterParams,
  OnSortType,
} from "@/components/ui/Table/hook/useTable";
import { useGetDocumentFilesQuery } from "@/usecases/document/reader";
import { formatDateTimeFromString } from "@/utils/dateFormatter";

type TicketRow = {
  documentName: string;
  department: string;
  documentType: string;
  createdDate: string;
};

export type ColumnKeys = TicketRow & {
  fileIcon: React.ReactNode;
  infoIcon: React.ReactNode;
};

type Props = {
  searchWord: string;
  departmentId: string | null;
  onItemClick: (id: string) => void;
  onRowDoubleClick: (id: string) => void;
  onDetailClick: (id: string) => void;
  documentTypeFilter: filterList;
};

export const DocumentsFileTable = ({
  searchWord,
  departmentId,
  onDetailClick,
  onItemClick,
  onRowDoubleClick,
  documentTypeFilter,
}: Props) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [sortParams, setSortParams] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const { data: documentFiles } = useGetDocumentFilesQuery(
    searchWord,
    departmentId !== null ? departmentId.toString() : "",
    filterParams.documentType || "",
    sortParams ? `${sortParams.key}:${sortParams.direction}` : "",
    pageSize,
    currentPage,
  );

  const maxPage = documentFiles?.totalPage ?? 0;

  const handleSortClick: OnSortType<keyof ColumnKeys> = useCallback(
    (params) => {
      setSortParams(params);
    },
    [],
  );

  const handleFilterClick = useCallback((filters: FilterParams) => {
    setFilterParams(filters);
  }, []);

  const handleTableRowDoubleClick = useCallback(
    (row: BodyRow<ColumnKeys>) => {
      onRowDoubleClick(row.id);
    },
    [onRowDoubleClick],
  );

  const rows: BodyRow<ColumnKeys>[] = useMemo(() => {
    if (!documentFiles?.results) {
      return [];
    }

    return documentFiles.results.map((item) => ({
      id: item.officialDocumentId,
      cells: {
        fileIcon: <File />,
        documentName: item.officialDocumentName,
        department: item.publicationSourceOrganizationCode.name,
        documentType: item.fileType,
        createdDate: formatDateTimeFromString(item.documentCreatedAt),
        infoIcon: (
          <Button className="w-9 h-9" variant="ghost">
            <Info />
          </Button>
        ),
      },
    }));
  }, [documentFiles]);
  const headerColumns: HeaderColumn<ColumnKeys, keyof ColumnKeys>[] =
    useMemo(() => {
      return [
        {
          children: "",
          className: "w-6",
          key: "fileIcon",
          sorted: SORTED_STATE.NON,
        },
        {
          buttonClassName: "",
          children: "正文書",
          className: "flex-1 min-w-98",
          key: "documentName",
          sorted: SORTED_STATE.NON,
          onCellClick: (row) => onItemClick(row.id),
        },
        {
          buttonClassName: "text-sm",
          children: "管理元組織",
          className: "w-80",
          key: "department",
          sorted: SORTED_STATE.NON,
        },
        {
          buttonClassName: "text-sm",
          children: "文書種類",
          className: "w-40",
          key: "documentType",
          sorted: SORTED_STATE.NON,
          filterOptions: documentTypeFilter,
        },
        {
          buttonClassName: "text-sm",
          children: "作成日時",
          className: "w-40",
          key: "createdDate",
          sorted: SORTED_STATE.UNSORTED,
        },
        {
          children: "",
          className: "w-6",
          key: "infoIcon",
          sorted: SORTED_STATE.NON,
          onCellClick: (row) => onDetailClick(row.id),
        },
      ];
    }, [onItemClick, documentTypeFilter, onDetailClick]);

  return (
    <div className="pt-4">
      <Table
        bodyRows={rows}
        headerColumns={headerColumns}
        onFilter={handleFilterClick}
        onRowDoubleClick={handleTableRowDoubleClick}
        onSort={handleSortClick}
        pagination={{ currentPage, maxPage, onClick: setCurrentPage }}
      />
    </div>
  );
};
