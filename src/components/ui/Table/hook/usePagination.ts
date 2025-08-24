import { useMemo } from "react";
import type { SetURLSearchParams } from "react-router";

type PaginationMeta = {
  currentPage: number;
  pageLength: number;
  total: number;
};

export const usePagination = (
  meta: PaginationMeta,
  setSearchParams: SetURLSearchParams,
) => {
  const pagination = useMemo(() => {
    return {
      currentPage: meta.currentPage,
      maxPage: meta.pageLength,
      onClick: (page: number) => {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("page", String(page));
          return newParams;
        });
      },
    };
  }, [meta, setSearchParams]);

  return {
    pagination,
  };
};
