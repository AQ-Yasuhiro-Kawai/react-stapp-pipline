import { Suspense } from "react";
import { DocumentsDetailPage } from "@/components/pages/Documents/Detail/DocumentsDetail";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";

export const DocumentsDetail = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <DocumentsDetailPage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
