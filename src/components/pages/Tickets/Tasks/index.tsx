import { Suspense } from "react";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { TasksContent } from "./Tasks";

export const Tasks = () => {
  return (
    <AppLayout enableResponsive>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          <TasksContent />
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
