import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { AnnouncementsPage } from "./Announcements";

export const Announcements = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <AnnouncementsPage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
