import { type LoaderFunction, redirect } from "react-router";

function getUserAgent() {
  return navigator.userAgent;
}

export const mobileLoader: LoaderFunction = ({ request }) => {
  const userAgent = getUserAgent();
  const isMobile =
    /iPhone|iPod/i.test(userAgent) ||
    (/Android/i.test(userAgent) && /Mobile/i.test(userAgent));

  const { pathname } = new URL(request.url);
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/callback") ||
    pathname.startsWith("/tickets/tasks")
  ) {
    return null;
  }

  if (isMobile) {
    return redirect("/tickets/tasks");
  }

  return null;
};
