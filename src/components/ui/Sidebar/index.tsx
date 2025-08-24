import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Boxes,
  Files,
  Info,
  SquarePen,
  Ticket,
  TicketCheck,
  Users,
} from "lucide-react";
import { useLocation } from "react-router";
import { cn } from "@/utils/cn";
import { SidebarItem } from "./components/SidebarItem/SidebarItem";

type SidebarProps = {
  enableResponsive?: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
};

const NAV_ITEMS = [
  { icon: Boxes, id: 1, label: "プロジェクト一覧", path: "/projects" },
  { icon: Files, id: 2, label: "正文書一覧", path: "/documents" },
  { icon: Ticket, id: 3, label: "マイチケット", path: "/tickets/mytickets" },
  { icon: TicketCheck, id: 4, label: "承認依頼一覧", path: "/tickets/tasks" },
  { icon: Info, id: 5, label: "お知らせ", path: "/announcements" },
  {
    icon: SquarePen,
    id: 6,
    label: "お知らせ管理",
    path: "/admin/announcements",
  },
  { icon: Users, id: 7, label: "管理者ユーザー一覧", path: "/admin/users" },
] as const;

export const Sidebar = ({
  enableResponsive,
  isCollapsed,
  onToggle,
}: SidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-shrink-0 flex-col bg-sub-bg px-2 py-4 transition-all duration-300 ease-in-out ",
        isCollapsed ? "w-14" : "w-60",
        enableResponsive && "mobile:hidden",
      )}
    >
      <div className={cn("mb-4")}>
        <button
          aria-label="サイドバーを折りたたむ"
          className="flex h-10 w-10 items-center justify-center rounded-md text-main-text transition-colors hover:bg-main-bg"
          onClick={onToggle}
          type="button"
        >
          {isCollapsed ? (
            <ArrowRightFromLine className="h-6 w-6" />
          ) : (
            <ArrowLeftFromLine className="h-6 w-6" />
          )}
        </button>
      </div>
      <nav>
        <ul className="flex flex-col gap-y-4">
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              active={location.pathname.startsWith(item.path)}
              icon={item.icon}
              isCollapsed={isCollapsed}
              key={item.id}
              label={item.label}
              path={item.path}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};
