import { ErrorBoundary } from "react-error-boundary";
import NotFoundError from "../NotFoundError";
import UnknownError from "../UnknownError";

type Props = {
  children: React.ReactNode;
};

export function AppErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        const status = error?.cause?.status;
        if (status === 403 || status === 404) {
          return <NotFoundError />;
        }
        return <UnknownError error={error?.cause?.errorData?.message} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
