import type { LucideIcon } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/utils/cn";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  isCollapsed?: boolean;
  path: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  active,
  isCollapsed,
  path,
}: SidebarItemProps) => {
  return (
    <Link to={path}>
      <li>
        <button
          className={cn(
            "flex h-10 w-full items-center rounded-md p-2 text-left text-main-text transition-colors duration-200 ease-in-out",
            !isCollapsed && "gap-2",
            active
              ? "bg-main-blue/10 hover:bg-main-blue/20"
              : "hover:bg-thin-bg",
          )}
          title={isCollapsed ? label : undefined}
          type="button"
        >
          <Icon className="h-6 w-6 flex-shrink-0" />
          <span
            className={cn(
              "whitespace-nowrap text-sm transition-all duration-200",
              isCollapsed ? "w-0 opacity-0" : "w-full opacity-100",
            )}
          >
            {label}
          </span>
        </button>
      </li>
    </Link>
  );
};
