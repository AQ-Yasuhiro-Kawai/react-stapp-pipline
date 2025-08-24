import { cn } from "@utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import type * as React from "react";
import { useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/shadcn/ui/popover";

type Crumb = {
  id: string;
  label: string;
  driveId: string;
};

type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof breadcrumbVariants> & {
    crumbs: Crumb[];
    separatorIcon?: React.ReactNode;
    isModal?: boolean; // モーダル内で使用するかどうか
    onCrumbClick?: (crumb: Crumb) => void; // 遷移用コールバック
  };

const breadcrumbVariants = cva("flex items-center text-sm", {
  defaultVariants: {
    size: "xl",
  },
  variants: {
    size: {
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm",
      xl: "text-xl",
    },
  },
});

const transformDisplayBreadCrumbs = (crumbs: BreadcrumbProps["crumbs"]) => {
  const hasOverflow = crumbs.length > 3;

  if (hasOverflow) {
    return [
      {
        hiddenCrumbs: crumbs.slice(0, crumbs.length - 3),
        id: "ellipsis",
        label: "…",
        href: undefined,
      },
      ...crumbs.slice(crumbs.length - 3),
    ];
  }

  return crumbs;
};

// 通常のパンくずリストアイテム
const CrumbItem = ({
  crumb,
  isLast,
  isModal,
  onCrumbClick,
}: {
  crumb: Crumb;
  isLast: boolean;
  isModal: boolean;
  onCrumbClick?: (crumb: Crumb) => void;
}) => {
  const { label } = crumb;
  if (!isModal) {
    return (
      <button
        aria-current={isLast ? "page" : undefined}
        className={cn(
          "transition-colors rounded-md",
          isLast ? "text-[color:var(--color-main-text)]" : "text-sub-text",
          !isLast && "hover:bg-[color:var(--color-sub-bg)] cursor-pointer px-1",
        )}
        onClick={() => {
          if (!isLast && onCrumbClick) onCrumbClick(crumb);
        }}
        type="button"
      >
        {label}
      </button>
    );
  }

  // モーダル内のパンくずリストアイテム
  return (
    <button
      aria-current={isLast ? "page" : undefined}
      className={cn(
        "transition-colors rounded-md",
        isLast ? "text-[color:var(--color-main-text)]" : "text-sub-text",
        !isLast && "hover:bg-[color:var(--color-sub-bg)] cursor-pointer px-1",
      )}
      onClick={() => {
        if (!isLast && onCrumbClick) onCrumbClick(crumb);
      }}
      type="button"
    >
      {label}
    </button>
  );
};

// overflowのパンくずリストアイテム
const OverflowCrumb = ({
  hiddenCrumbs,
  isModal,
  onCrumbClick,
}: {
  hiddenCrumbs: Crumb[];
  isModal: boolean;

  onCrumbClick?: (crumb: Crumb) => void;
}) => {
  if (!isModal) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "inline-flex items-center p-1 gap-2 rounded-md bg-transparent",
              "hover:bg-[color:var(--color-sub-bg)]",
            )}
            type="button"
          >
            <MoreHorizontal className="size-4 text-sub-text" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-1 rounded-lg bg-white shadow-lg w-auto"
          side="bottom"
        >
          <ul className="flex flex-col gap-1">
            {hiddenCrumbs.map((hiddenCrumb) => (
              <li className="font-bold" key={hiddenCrumb.id}>
                <button
                  className={cn(
                    "text-sub-text text-left w-full px-2 py-1 rounded-md",
                    "hover:bg-[color:var(--color-sub-bg)] cursor-pointer",
                  )}
                  onClick={() => onCrumbClick?.(hiddenCrumb)}
                  type="button"
                >
                  {hiddenCrumb.label}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center p-1 gap-2 rounded-md bg-transparent",
            "hover:bg-[color:var(--color-sub-bg)]",
          )}
          type="button"
        >
          <MoreHorizontal className="size-4 text-sub-text" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-1 rounded-lg bg-white shadow-lg w-auto"
        side="bottom"
      >
        <ul className="flex flex-col gap-1">
          {hiddenCrumbs.map((hiddenCrumb) => (
            <li className="font-bold" key={hiddenCrumb.id}>
              <button
                className={cn(
                  "text-sub-text text-left w-full px-2 py-1 rounded-md",
                  "hover:bg-[color:var(--color-sub-bg)] cursor-pointer",
                )}
                onClick={() => onCrumbClick?.(hiddenCrumb)}
                type="button"
              >
                {hiddenCrumb.label}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export function Breadcrumb({
  className,
  crumbs = [],
  size,
  separatorIcon,
  isModal = false,
  onCrumbClick,
  ...props
}: BreadcrumbProps) {
  const displayCrumbs = useMemo(
    () => transformDisplayBreadCrumbs(crumbs),
    [crumbs],
  );

  return (
    <nav
      aria-label="breadcrumb"
      className={cn(breadcrumbVariants({ className, size }))}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 font-bold">
        {displayCrumbs.map((crumb, index) => {
          const isLast = index === displayCrumbs.length - 1;
          const isOverflow = "hiddenCrumbs" in crumb;

          return (
            <li className="flex items-center gap-x-1.5" key={crumb.id}>
              {isOverflow ? (
                <OverflowCrumb
                  hiddenCrumbs={crumb.hiddenCrumbs}
                  isModal={isModal}
                  onCrumbClick={onCrumbClick}
                />
              ) : (
                <CrumbItem
                  crumb={crumb}
                  isLast={isLast}
                  isModal={isModal}
                  onCrumbClick={onCrumbClick}
                />
              )}
              {!isLast &&
                (separatorIcon ?? (
                  <ChevronRight className="size-3.5 text-sub-text" />
                ))}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
