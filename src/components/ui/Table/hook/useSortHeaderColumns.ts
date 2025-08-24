import type { SORTED_STATE } from "@components/ui/Table/components/Table";
import { useMemo } from "react";
import type { HeaderColumn } from "@/components/ui/Table";

export const useSortHeaderColumns = <T extends object, U extends keyof T>(
  headerColumns: HeaderColumn<T, U>[],
  key: string | null,
  order: string | null,
) => {
  const sortedHeaderColumns = useMemo(() => {
    return headerColumns.map((column) => {
      if (column.key === key) {
        return {
          ...column,
          sorted: order as (typeof SORTED_STATE)[keyof typeof SORTED_STATE],
        };
      }
      return column;
    });
  }, [headerColumns, key, order]);

  return {
    sortedHeaderColumns,
  };
};
