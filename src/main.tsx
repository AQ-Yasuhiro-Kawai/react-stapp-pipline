import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@assets/styles/index.css";
import { MsalProvider } from "@azure/msal-react";
import { initializeMsal, msalInstance } from "@lib/msal/instance";
import { queryClient } from "@lib/tanstackQuery/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouter, createRouter } from "@/routes";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const initialize = async () => {
  await initializeMsal();
  await enableMocking();

  const router = createRouter();

  createRoot(rootElement).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          <AppRouter router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MsalProvider>
    </StrictMode>,
  );
};

initialize().catch((error) => {
  console.error("Failed to initialize the application:", error);
});
