import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { NewTicketsDocumentUpdatePage } from "./NewTicketsDocumentUpdate";

function NewTicketsDocumentUpdate() {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <NewTicketsDocumentUpdatePage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
}

export { NewTicketsDocumentUpdate };
