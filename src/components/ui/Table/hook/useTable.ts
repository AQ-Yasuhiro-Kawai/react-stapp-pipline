import { useCallback, useEffect, useState } from "react";
import type { BodyRow, HeaderColumn } from "../";
import { SORTED_STATE } from "../components/Table";

export type OnSortType<U> = (params: {
  key: U;
  direction: (typeof SORTED_STATE)[keyof typeof SORTED_STATE];
}) => void;

export type FilterParams = Record<string, string>;

type Props<T extends object, U extends keyof T> = {
  bodyData: BodyRow<T>[];
  headerColumns: HeaderColumn<T, U>[];
  filterParams?: FilterParams;
  onSort?: OnSortType<U>;
  onFilter?: (filters: FilterParams) => void;
  onPaginationClick?: (page: number) => void;
};

export const useTable = <T extends object, U extends keyof T>({
  headerColumns,
  onSort,
  onFilter,
  onPaginationClick,
}: Props<T, U>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: U | null;
    direction: (typeof SORTED_STATE)[keyof typeof SORTED_STATE];
  }>({
    direction: SORTED_STATE.NON,
    key: null,
  });

  const [filters, setFilters] = useState<FilterParams>({});

  // 初期ソート状態の設定（任意）
  useEffect(() => {
    const priorityColumn = headerColumns.find(
      (col) =>
        col.sorted === SORTED_STATE.ASCENDING ||
        col.sorted === SORTED_STATE.DESCENDING,
    );

    const fallbackColumn = headerColumns.find(
      (col) => col.sorted === SORTED_STATE.UNSORTED,
    );

    const initialColumn = priorityColumn ?? fallbackColumn;

    setSortConfig({
      direction: initialColumn?.sorted ?? SORTED_STATE.NON,
      key: initialColumn?.key ?? null,
    });
  }, [headerColumns]);

  // ソート操作：状態を更新し、親に通知
  const handleSort = useCallback(
    (columnKey: U) => {
      const isSameKey = sortConfig.key === columnKey;
      const newDirection = isSameKey
        ? sortConfig.direction === SORTED_STATE.ASCENDING
          ? SORTED_STATE.DESCENDING
          : SORTED_STATE.ASCENDING
        : SORTED_STATE.DESCENDING;

      setSortConfig({ direction: newDirection, key: columnKey });

      // 修正後
      if (onSort) {
        onSort({
          direction: newDirection,
          key: columnKey,
        });
      }
    },
    [sortConfig, onSort],
  );

  const handleFilter = useCallback(
    (key: string, value?: string) => {
      const next = { ...filters };

      if (value === undefined) {
        delete next[key];
      } else {
        next[key] = value;
      }

      setFilters(next);

      if (onFilter) {
        onFilter(next);
      }
    },
    [filters, onFilter],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (onPaginationClick) onPaginationClick(page);
    },
    [onPaginationClick],
  );

  return {
    filters,
    handleFilter,
    handlePageChange,
    handleSort,
    sortConfig,
  };
};
