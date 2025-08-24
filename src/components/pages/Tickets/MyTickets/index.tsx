import { Suspense } from "react";
import { MyticketsPage } from "@/components/pages/Tickets/MyTickets/Mytickets";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";

export const Mytickets = () => {
  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <MyticketsPage />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
