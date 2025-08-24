import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";

export const AdminAnnouncements = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <div className="flex-1 min-w-0 h-full pr-4 pb-4">
            お知らせ管理画面
          </div>
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
