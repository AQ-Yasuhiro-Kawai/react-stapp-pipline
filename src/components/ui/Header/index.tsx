import { Bell, User } from "lucide-react";
import { cn } from "@/utils/cn";

type HeaderProps = {
  enableResponsive?: boolean;
};

export const Header = ({ enableResponsive }: HeaderProps) => {
  return (
    <header
      className={cn(
        "flex h-18 items-center justify-between bg-sub-bg pr-2",
        enableResponsive && "mobile:justify-end",
      )}
    >
      <div
        className={cn("flex items-center", enableResponsive && "mobile:hidden")}
      >
        <a aria-label="トップページへ" className="p-3" href="/">
          <img
            alt="Document Portal ロゴ"
            className="h-auto"
            height="48"
            src="/logo.svg"
          />
        </a>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="通知"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md p-2 text-main-text transition-colors duration-200 ease-in-out hover:bg-main-bg focus:outline-none focus:ring-2 focus:ring-main-text focus:ring-offset-2"
          type="button"
        >
          <Bell className="h-6 w-6" />
        </button>

        <button
          className="flex h-10 items-center gap-2 rounded-md p-2 text-main-text transition-colors duration-200 ease-in-out hover:bg-main-bg focus:outline-none focus:ring-2 focus:ring-main-text focus:ring-offset-2"
          type="button"
        >
          <User className="h-6 w-6 text-main-text" />
          <span className="text-sm font-medium">田中 太郎</span>
        </button>
      </div>
    </header>
  );
};
