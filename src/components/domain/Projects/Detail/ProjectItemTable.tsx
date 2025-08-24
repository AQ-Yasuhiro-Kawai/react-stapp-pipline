import { cn } from "@utils/cn";
import {
  ExternalLink,
  File,
  FileQuestion,
  FileText,
  Folder,
  Image,
  Inbox,
  MoreVertical,
} from "lucide-react";
import type {
  ProjectItem,
  ProjectItemIconType,
  ProjectItemLucideIconType,
  ProjectItemView,
} from "@/components/domain/Projects/types/project";
import { Icon } from "@/components/ui/Icons";
import type { BodyRow, HeaderColumn } from "@/components/ui/Table";
import { Table } from "@/components/ui/Table";
import type { PaginationProps } from "@/components/ui/Table/components/Pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/shadcn/ui/popover";

type ProjectItemTableProps = {
  items: ProjectItem[];
  pagination?: PaginationProps;
  isLoading?: boolean;
  onRowClick?: (item: ProjectItem) => void;
};

const isLucideIconType = (
  type: ProjectItemIconType,
): type is ProjectItemLucideIconType => {
  return (
    type === "file" ||
    type === "fileText" ||
    type === "fileQuestion" ||
    type === "folder" ||
    type === "image"
  );
};

export function ProjectItemTable({
  items,
  pagination,
  isLoading,
  onRowClick,
}: ProjectItemTableProps) {
  const headerColumns: HeaderColumn<ProjectItemView, keyof ProjectItemView>[] =
    [
      { children: "", className: "w-12", key: "icon" },
      {
        children: "ファイル名",
        className: "w-auto text-nowrap",
        key: "name",
      },
      {
        children: "更新者",
        className: "w-40 text-nowrap",
        key: "updatedBy",
      },
      {
        children: "更新日時",
        className: "w-40 text-nowrap",
        key: "updatedAt",
      },
      {
        children: "サイズ",
        className: "w-30 text-nowrap",
        key: "size",
      },
      { children: "", className: "w-18", key: "actionIcons" },
    ];

  const bodyRows: BodyRow<ProjectItemView>[] = items.map((item) => {
    const { id, name, updatedBy, updatedAt, type, isArchived } = item;

    return {
      id,
      onClick: () => {
        if (onRowClick) {
          onRowClick(item);
        }
      },
      cells: {
        icon: (() => {
          if (!isLucideIconType(type)) {
            return <Icon alt={type} className="w-6 h-6" type={type} />;
          }
          switch (type) {
            case "file":
              return <File className="w-6 h-6" />;
            case "folder":
              return <Folder className="w-6 h-6" />;
            case "fileText":
              return <FileText className="w-6 h-6" />;
            case "fileQuestion":
              return <FileQuestion className="w-6 h-6" />;
            case "image":
              return <Image className="w-6 h-6" />;
            default:
              return null;
          }
        })(),
        name:
          type === "folder" ? (
            <a className="underline w-full line-clamp-2" href="/">
              {name}
            </a>
          ) : (
            <span className="underline w-full line-clamp-2">{name}</span>
          ),
        updatedBy,
        updatedAt,
        size: <span className="block">{item.size}</span>,
        actionIcons: item.size ? (
          <div className="flex items-center justify-start">
            <button
              className={cn(
                "inline-flex items-center p-2 gap-2 rounded-md bg-transparent",
                "",
                `${isArchived ? "text-main-border" : "hover:bg-[color:var(--color-sub-bg)] cursor-pointer"}`,
              )}
              onClick={() => console.log("click Inbox icon")}
              type="button"
            >
              <Inbox className="size-4" />
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "inline-flex items-center p-2 gap-2 rounded-md bg-transparent cursor-pointer",
                    "hover:bg-[color:var(--color-sub-bg)]",
                  )}
                  type="button"
                >
                  <MoreVertical className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="p-1 rounded-lg bg-white shadow-lg w-auto"
                side="left"
              >
                <ul className="flex flex-col gap-1">
                  <li>
                    <button
                      className={cn(
                        "text-main-text text-left w-full px-2 py-1 rounded-md flex gap-2 items-center font-bold",
                        "hover:bg-[color:var(--color-sub-bg)] cursor-pointer",
                      )}
                      onClick={() => console.log("click add inbox")}
                      type="button"
                    >
                      <Inbox className={`size-4`} />
                      正文書トレイに追加
                    </button>
                  </li>
                  <li>
                    <button
                      className={cn(
                        "text-main-text text-left w-full px-2 py-1 rounded-md flex gap-2 items-center font-bold",
                        "hover:bg-[color:var(--color-sub-bg)] cursor-pointer",
                      )}
                      onClick={() => console.log("click open item")}
                      type="button"
                    >
                      <ExternalLink className={`size-4`} />
                      開く
                    </button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        ) : null,
      },
    };
  });

  return (
    <Table<ProjectItemView, keyof ProjectItemView>
      bodyRows={bodyRows}
      headerColumns={headerColumns}
      isLoading={isLoading}
      pagination={pagination}
    />
  );
}
