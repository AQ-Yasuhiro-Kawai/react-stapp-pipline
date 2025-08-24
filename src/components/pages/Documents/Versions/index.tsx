import { Suspense } from "react";
import { DocumentVersionsPage } from "@/components/pages/Documents/Versions/DocumentsVersions";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";

export const DocumentVersions = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <DocumentVersionsPage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
