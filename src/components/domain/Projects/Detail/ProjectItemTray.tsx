import { cn } from "@utils/cn";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  File,
  Inbox,
  LoaderCircle,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScrollBar } from "@/components/ui/ScrollBar";
import type { TrayItem } from "../types/project";

type Props = {
  items: TrayItem[];
};

const renderIcon = (status: string) => {
  switch (status) {
    case "uploaded":
      return <File className="size-6" />;
    case "processing":
      return <LoaderCircle className="size-6 animate-spin text-sub-text" />;
    default:
      return null;
  }
};

export const ProjectItemsTray = ({ items: initialItems }: Props) => {
  const [isOpen, setOpen] = useState(true);
  const [items, setItems] = useState<TrayItem[]>(initialItems);

  const itemsRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div
      className={cn(
        "flex-shrink-0 border relative rounded-lg h-full",
        isOpen ? "w-[300px]" : "w-auto",
      )}
    >
      {isOpen ? (
        <div className="p-4 pb-28 w-full h-full">
          <div className="flex justify-between items-center mb-2 ">
            <h2 className="flex items-center gap-2 font-bold">
              <Inbox className="size-6" />
              <span>正文書登録トレイ</span>
            </h2>
            <button
              className="flex p-2 items-center justify-center rounded-md text-main-text transition-colors hover:bg-sub-bg"
              onClick={() => setOpen(!isOpen)}
              type="button"
            >
              <ArrowRightFromLine className="size-4" strokeWidth={2.5} />
            </button>
          </div>
          <div className="h-full">
            <ScrollBar className="h-full">
              <ul>
                {items.map((item) => (
                  <li className="p-4 border-b hover:bg-thin-bg" key={item.id}>
                    <div className="flex gap-4 items-center">
                      <div>{renderIcon(item.status)}</div>
                      <div
                        className={cn(
                          "underline",
                          item.status === "uploaded" && "text-sub-main",
                          item.status === "processing" && "text-sub-text",
                        )}
                      >
                        {item.name}.{item.type}
                      </div>
                      <button
                        className="ml-auto mr-0 cursor-pointer"
                        onClick={() => itemsRemove(item.id)}
                        type="button"
                      >
                        <X className="size-4" strokeWidth={2.5} />
                      </button>
                    </div>
                    <span className="text-sm text-sub-text pl-4">
                      {item.path}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollBar>
          </div>
          <div className="space-y-2 absolute bottom-4 right-4">
            <Button className="w-full" onClick={() => console.log("登録")}>
              <Zap className="size-6" />
              正文書登録
            </Button>
          </div>
        </div>
      ) : (
        <button
          className="flex flex-col items-center gap-4 relative p-4 h-full w-auto hover:bg-thin-bg cursor-pointer rounded-lg"
          onClick={() => setOpen(!isOpen)}
          type="button"
        >
          <div>
            <Inbox className="size-6" />
          </div>
          <div className="flex flex-col items-center">
            <File className="size-6 text-sub-text" />
            <span className="text-sm text-sub-text ">x{items.length}</span>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2">
            <div className="flex p-2 items-center justify-center rounded-md text-main-text transition-color">
              <ArrowLeftFromLine className="size-4" strokeWidth={2.5} />
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
