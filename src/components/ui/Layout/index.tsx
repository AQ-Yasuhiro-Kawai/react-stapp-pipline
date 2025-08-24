import { Header } from "@components/ui/Header";
import { Sidebar } from "@components/ui/Sidebar";
import { useShallow } from "zustand/shallow";
import { ScrollBar } from "@/components/ui/ScrollBar";
import { PageTitle } from "@/components/ui/Title";
import { sidebarSelector } from "@/store/sidebarSlice";
import { useBoundStore } from "@/store/store";
import { cn } from "@/utils/cn";

type AppLayoutProps = {
  enableResponsive?: boolean;
  children: React.ReactNode;
};

function AppLayout({ enableResponsive, children }: AppLayoutProps) {
  const { isSidebarCollapsed, toggleSidebar } = useBoundStore(
    useShallow(sidebarSelector),
  );
  return (
    <div className="flex h-screen flex-col bg-sub-bg">
      <Header enableResponsive={enableResponsive} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          enableResponsive={enableResponsive}
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
        />
        <div
          className={cn(
            "flex-1 min-w-0 h-full pr-4 pb-4",
            enableResponsive && "mobile:px-4",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function MainContent({
  pageTitle,
  children,
  className,
}: {
  pageTitle: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "h-full w-full rounded-xl bg-main-bg border-1 border-main-bg flex flex-col relative",
        className,
      )}
    >
      <ScrollBar className="p-4 h-full">
        <PageTitle>{pageTitle}</PageTitle>
        {children}
      </ScrollBar>
    </main>
  );
}

export { AppLayout, MainContent };
