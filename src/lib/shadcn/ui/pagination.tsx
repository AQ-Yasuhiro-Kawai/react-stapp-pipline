import { cn } from "@utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import {
  Button,
  type ButtonProps,
  SIZE,
  VARIANT,
} from "@/components/ui/Button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"ul">) => (
  <ul
    className={cn("flex flex-row items-center gap-1", className)}
    ref={ref}
    {...props}
  />
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"li">) => (
  <li className={cn("", className)} ref={ref} {...props} />
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  isPrevious?: boolean;
  isNext?: boolean;
} & ButtonProps;

const PaginationLink = ({
  className,
  isActive,
  isPrevious,
  isNext,
  ...props
}: PaginationLinkProps) => (
  <Button
    className={cn(className, "font-normal")}
    prefixElement={isPrevious && <ChevronLeft />}
    size={isPrevious || isNext ? SIZE.MEDIUM : SIZE.ICON}
    suffixElement={isNext && <ChevronRight />}
    variant={isActive ? VARIANT.OUTLINED : VARIANT.GHOST}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5", className)}
    isPrevious
    {...props}
  >
    前
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", className)}
    isNext
    {...props}
  >
    次
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}
  >
    ...
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
