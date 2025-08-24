import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { ModifyTicketsDocumentDeletePage } from "./ModifyTicketsDocumentDelete";

export const ModifyTicketsDocumentDelete = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <ModifyTicketsDocumentDeletePage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
