import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout, MainContent } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { NotificationsPage } from "./Notifications";

export const Notifications = () => {
  return (
    <AppLayout>
      <MainContent pageTitle="通知一覧">
        <Suspense fallback={<SpinnerOverlay />}>
          <AppErrorBoundary>
            <NotificationsPage />
          </AppErrorBoundary>
        </Suspense>
      </MainContent>
    </AppLayout>
  );
};
