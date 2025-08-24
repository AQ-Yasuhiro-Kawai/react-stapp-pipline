import { ForbiddenError, UnauthorizedError } from "@shared/error";
import { useRouteError } from "react-router";
import ForbiddenErrorComponent from "./ForbiddenError";
import NotFoundErrorComponent from "./NotFoundError";
import UnauthorizedErrorComponent from "./UnauthorizedError";
import UnknownErrorComponent from "./UnknownError";

type Props = {
  status?: number;
};
function ErrorSelector({ status }: Props) {
  const error = useRouteError();
  if (status === 404) {
    return <NotFoundErrorComponent />;
  }
  if (error instanceof UnauthorizedError) {
    return <UnauthorizedErrorComponent />;
  }
  if (error instanceof ForbiddenError) {
    return <ForbiddenErrorComponent />;
  }
  return <UnknownErrorComponent error={error} />;
}

export default ErrorSelector;
