import { Suspense } from "react";
import { DocumentsPage } from "@/components/pages/Documents/Documents";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";

export const Documents = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <DocumentsPage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
