import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { NewTicketsDocumentDeletePage } from "./NewTicketsDocumentDelete";

export function NewTicketsDocumentDelete() {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <NewTicketsDocumentDeletePage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
}
