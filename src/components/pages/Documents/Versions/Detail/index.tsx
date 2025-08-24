import { Suspense } from "react";
import { DocumentVersionDetailPage } from "@/components/pages/Documents/Versions/Detail/DocumentsVersionDetail";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";

export const DocumentVersionDetail = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <DocumentVersionDetailPage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
