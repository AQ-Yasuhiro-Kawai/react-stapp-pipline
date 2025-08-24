import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from "@lib/shadcn/ui/pagination";

export type PaginationProps = {
  currentPage: number;
  maxPage: number;
  onClick: (page: number) => void;
};

function Pagination({ currentPage, maxPage, onClick }: PaginationProps) {
  return (
    <ShadcnPagination className="mt-4">
      <PaginationContent>
        {/* 前ボタン */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onClick(currentPage - 1)} />
          </PaginationItem>
        )}
        {/* ...表示 */}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {/* prevPage */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => onClick(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {/* currentPage */}
        <PaginationItem>
          <PaginationLink className="pointer-events-none" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {/* nextPage */}
        {currentPage < maxPage && (
          <PaginationItem>
            <PaginationLink onClick={() => onClick(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {/* ...表示 */}
        {currentPage < maxPage - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {/* 次ボタン */}
        {currentPage < maxPage && (
          <PaginationItem>
            <PaginationNext onClick={() => onClick(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadcnPagination>
  );
}

export { Pagination };
