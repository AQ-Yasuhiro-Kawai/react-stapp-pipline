import { cn } from "@utils/cn";
import React from "react";
import { Pagination, type PaginationProps } from "./components/Pagination";
import {
  Table as ComponentTable,
  SORTED_STATE,
  TableBody,
  TableCell,
  TableFilterableHead,
  TableHead,
  TableHeader,
  TableRow,
  TableSortableHead,
} from "./components/Table";
import { type FilterParams, type OnSortType, useTable } from "./hook/useTable";

export type HeaderColumn<T extends object, U extends keyof T> = {
  key: U;
  children: React.ReactNode;
  sorted?: (typeof SORTED_STATE)[keyof typeof SORTED_STATE];
  filterOptions?: {
    label: string;
    value: string;
  }[];
  className?: string;
  buttonClassName?: string;
  onCellClick?: (row: BodyRow<T>) => void;
};

export type BodyRow<T extends object> = {
  id: string;
  cells: T;
  className?: string;
  isColorChangeWhenHover?: boolean;
};

type TableProps<T extends object, U extends keyof T> = {
  headerColumns: HeaderColumn<T, U>[];
  bodyRows: BodyRow<T>[];
  onSort?: OnSortType<U>;
  onFilter?: (filters: FilterParams) => void;
  onRowClick?: (columnId: string) => void;
  onRowDoubleClick?: (row: BodyRow<T>) => void;
  pagination?: PaginationProps;
  filterParams?: FilterParams;
  className?: string;
  isLoading?: boolean;
  isHideText?: boolean;
  headerInvisible?: boolean;
  bodyCellClassName?: string;
  selectedRowIds?: string[]; // 複数選択している行のIDリスト
};

/**
 * テーブルコンポーネント
 * @param headerColumns ヘッダーのカラム一覧
 * @param bodyRows ボディ一覧
 * @param onSort ソート時に呼び出される関数 設定されていない場合、ソートはテーブル内部で行われる
 * @param pagination ページネーション
 * @param onFilter フィルター入力時に呼び出される関数
 * @param className className
 * @param isLoading ローディング中
 * @param isHideText テキストを非表示にするかどうか
 * @param headerInvisible ヘッダーを隠す
 */

function Table<T extends object, U extends keyof T>({
  headerColumns,
  bodyRows,
  onSort,
  onFilter,
  onRowClick,
  onRowDoubleClick,
  pagination,
  className,
  isLoading,
  isHideText = false,
  headerInvisible = false,
  bodyCellClassName,
  selectedRowIds = [],
}: TableProps<T, U>) {
  const { handleSort, sortConfig, handlePageChange, handleFilter, filters } =
    useTable<T, U>({
      bodyData: bodyRows,
      headerColumns: headerColumns,
      onFilter: onFilter,
      onPaginationClick: pagination?.onClick,
      onSort: onSort,
    });

  return (
    <div className={cn(isLoading && "pointer-events-none", className)}>
      <ComponentTable>
        <TableHeader className={cn("relative", headerInvisible && "contents")}>
          <TableRow>
            {headerColumns.map((column) => {
              const key = String(column.key);
              const columnSorted = column.sorted;
              const sortedState = (() => {
                if (sortConfig.key && sortConfig.key === column.key) {
                  return sortConfig.direction;
                }
                if (sortConfig.key) {
                  return SORTED_STATE.UNSORTED;
                }
                if (columnSorted) {
                  return columnSorted;
                }
                return SORTED_STATE.UNSORTED;
              })();
              const selectedFilter = filters?.[key] ?? [];

              // ソート可能カラムか判定
              if (
                column.sorted !== undefined &&
                column.sorted !== SORTED_STATE.NON
              ) {
                return (
                  <TableSortableHead
                    buttonClassName={column.buttonClassName}
                    className={column.className}
                    key={key}
                    onSort={
                      columnSorted !== SORTED_STATE.NON
                        ? () => handleSort(column.key)
                        : undefined
                    }
                    sortedState={
                      columnSorted === SORTED_STATE.NON
                        ? columnSorted
                        : sortedState
                    }
                  >
                    {column.children}
                  </TableSortableHead>
                );
              }

              // フィルタ可能カラムか判定
              if (
                column.filterOptions !== undefined &&
                column.filterOptions.length > 0
              ) {
                return (
                  <TableFilterableHead
                    className={column.className}
                    filteredState={selectedFilter}
                    filterOptions={column.filterOptions}
                    key={key}
                    onFilter={(value) => handleFilter(key, value)}
                  >
                    {column.children}
                  </TableFilterableHead>
                );
              }

              return (
                <TableHead
                  className={cn(
                    column.className,
                    headerInvisible &&
                      "h-0 p-0 border-0 overflow-hidden [&>span]:p-0",
                  )}
                  key={key}
                >
                  {headerInvisible ? null : column.children}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                className="text-center text-sub-text"
                colSpan={headerColumns.length}
              >
                ロード中
              </TableCell>
            </TableRow>
          ) : bodyRows.length <= 0 && isHideText ? null : bodyRows.length <=
            0 ? (
            <TableRow>
              <TableCell
                className="text-center text-sub-text"
                colSpan={headerColumns.length}
              >
                該当なし
              </TableCell>
            </TableRow>
          ) : (
            bodyRows.map((column) => (
              <TableRow
                className={cn(
                  column.className,
                  selectedRowIds.includes(column.id) && "bg-muted/50",
                  column.isColorChangeWhenHover && "hover:bg-muted/50",
                )}
                key={column.id}
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(column.id);
                  }
                }}
                onDoubleClick={() => {
                  if (onRowDoubleClick) {
                    onRowDoubleClick(column);
                  }
                }}
              >
                {Object.entries(
                  column.cells as [string, string | React.ReactNode][],
                ).map(([key, value]) => {
                  const columnConfig = headerColumns.find((h) => h.key === key);

                  return (
                    <TableCell className="break-normal" key={key}>
                      {(() => {
                        if (columnConfig?.onCellClick) {
                          const handleClick = () =>
                            columnConfig.onCellClick?.(column);

                          // 値が文字列なら、buttonでラップ
                          if (typeof value === "string") {
                            return (
                              <button
                                className="text-left line-clamp-2 underline cursor-pointer"
                                onClick={handleClick}
                                type="button"
                              >
                                {value}
                              </button>
                            );
                          }

                          // 値がReact要素なら、onClickを注入してクローン
                          if (React.isValidElement(value)) {
                            return React.cloneElement(
                              value as React.ReactElement<{
                                onClick?: () => void;
                              }>,
                              { onClick: handleClick },
                            );
                          }
                        }

                        if (typeof value === "string") {
                          return (
                            <span
                              className={`${bodyCellClassName} line-clamp-2`}
                            >
                              {value}
                            </span>
                          );
                        }

                        return value;
                      })()}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </ComponentTable>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          maxPage={pagination.maxPage}
          onClick={handlePageChange}
        />
      )}
    </div>
  );
}

export { Table };
