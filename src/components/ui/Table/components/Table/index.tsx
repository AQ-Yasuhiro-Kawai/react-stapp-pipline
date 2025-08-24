import { cn } from "@utils/cn";
import { ArrowDown, ArrowDownUp, ArrowUp, Funnel } from "lucide-react";
import type * as React from "react";
import { Button, VARIANT } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/lib/shadcn/ui/dropdown-menu";

export const SORTED_STATE = {
  ASCENDING: "asc", // 昇順
  DESCENDING: "desc", // 降順
  NON: "non", // ソートなし
  UNSORTED: "unsorted", // 初期
} as const;

const Table = ({ className, ref, ...props }: React.ComponentProps<"table">) => (
  <div className="relative w-full overflow-auto">
    <table className={cn("w-full text-md", className)} ref={ref} {...props} />
  </div>
);
Table.displayName = "Table";

const TableHeader = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"thead">) => (
  <thead
    className={cn("border-main-border border-b", className)}
    ref={ref}
    {...props}
  />
);
TableHeader.displayName = "TableHeader";

const TableBody = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"tbody">) => (
  <tbody
    className={cn("[&_tr:]:border-main-border [&_tr]:border-b", className)}
    ref={ref}
    {...props}
  />
);
TableBody.displayName = "TableBody";

const TableFooter = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"tfoot">) => (
  <tfoot
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    ref={ref}
    {...props}
  />
);
TableFooter.displayName = "TableFooter";

const TableRow = ({ className, ref, ...props }: React.ComponentProps<"tr">) => (
  <tr
    className={cn(
      "select-none [&>td:first-child]:pl-4 [&>td:last-child]:pr-4 [&>td]:px-2 [&>th]:px-0",
      className,
    )}
    ref={ref}
    {...props}
  />
);
TableRow.displayName = "TableRow";

const TableHead = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"th">) => (
  <th
    className={cn("h-12 min-w-fit text-left", className)}
    ref={ref}
    {...props}
  >
    <span className="px-2 font-normal text-sub-text">{children}</span>
  </th>
);
TableHead.displayName = "TableHead";

const TableSortableHead = ({
  className,
  buttonClassName,
  children,
  onSort,
  sortedState,
  ref,
  ...props
}: React.ComponentProps<"th"> & {
  buttonClassName?: string;
  onSort?: React.MouseEventHandler<HTMLButtonElement>;
  sortedState: (typeof SORTED_STATE)[keyof typeof SORTED_STATE];
}) => (
  <th
    className={cn("h-12 min-w-fit text-left", className)}
    ref={ref}
    {...props}
  >
    <Button
      className={cn(
        "px-2 font-normal text-sub-text hover:bg-sub-bg focus-visible:outline-0 focus-visible:ring-0",
        sortedState !== SORTED_STATE.UNSORTED &&
          "bg-main-blue/20 text-main-text hover:bg-main-blue/10",
        buttonClassName,
      )}
      onClick={onSort}
      variant={VARIANT.GHOST}
    >
      {children}
      {sortedState === SORTED_STATE.UNSORTED && <ArrowDownUp size={16} />}
      {sortedState === SORTED_STATE.DESCENDING && <ArrowDown size={16} />}
      {sortedState === SORTED_STATE.ASCENDING && <ArrowUp size={16} />}
    </Button>
  </th>
);

TableSortableHead.displayName = "TableSortableHead";

const TableFilterableHead = ({
  className,
  children,
  onFilter,
  filterOptions,
  filteredState,
  ref,
  ...props
}: React.ComponentProps<"th"> & {
  onFilter: (value: string | undefined) => void;
  filteredState: string;
  filterOptions: { label: string; value: string }[];
}) => {
  const isFiltered = filteredState && filteredState.length > 0;
  return (
    <th
      className={cn("h-12 min-w-fit text-left", className)}
      ref={ref}
      {...props}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={cn(
              "px-2 font-normal text-sub-text hover:bg-sub-bg focus-visible:outline-0 focus-visible:ring-0",
              isFiltered &&
                "bg-main-blue/20 text-main-text hover:bg-main-blue/10",
            )}
            variant={VARIANT.GHOST}
          >
            {children}
            <Funnel className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuCheckboxItem
            checked={filteredState.length === 0}
            onCheckedChange={() => onFilter(undefined)}
          >
            選択をクリア
          </DropdownMenuCheckboxItem>
          {filterOptions.map((option) => (
            <DropdownMenuCheckboxItem
              checked={filteredState === option.value}
              key={option.value}
              onCheckedChange={() => onFilter(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </th>
  );
};
TableFilterableHead.displayName = "TableFilterableHead";

const TableCell = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"td">) => (
  <td
    className={cn(
      "h-13 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    ref={ref}
    {...props}
  />
);
TableCell.displayName = "TableCell";

const TableCaption = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"caption">) => (
  <caption
    className={cn("mt-4 text-muted-foreground text-sm", className)}
    ref={ref}
    {...props}
  />
);
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableSortableHead,
  TableFilterableHead,
};
