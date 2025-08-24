import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { NewTicketsPage } from "./NewTickets";

export function NewTicketsDocumentRegistration() {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <NewTicketsPage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
}
