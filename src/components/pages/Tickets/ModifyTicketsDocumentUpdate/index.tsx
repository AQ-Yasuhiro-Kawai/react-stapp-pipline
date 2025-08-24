import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { ModifyTicketsDocumentUpdatePage } from "./ModifyTicketsDocumentUpdate";

export const ModifyTicketsDocumentUpdate = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <ModifyTicketsDocumentUpdatePage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
