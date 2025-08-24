import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { ModifyTicketsDocumentRegistrationPage } from "./ModifyTicketsDocumentRegistration";

export const ModifyTicketsDocumentRegistration = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <ModifyTicketsDocumentRegistrationPage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
