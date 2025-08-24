import type { LoaderFunction } from "react-router";
import { authLoader } from "./authLoader";
import { mobileLoader } from "./mobileLoader";

export const guardLoader: LoaderFunction = async (args) => {
  // 未認証 -> /callback へリダイレクト
  const authResult = await authLoader(args);
  if (authResult instanceof Response) return authResult;

  // モバイル -> /tickets/tasks へリダイレクト
  const mobileResult = mobileLoader(args);
  if (mobileResult instanceof Response) return mobileResult;

  return null;
};
