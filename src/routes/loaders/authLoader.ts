import { InteractionRequiredAuthError } from "@azure/msal-browser";
import type { LoaderFunction } from "react-router";
import { loginRequest } from "@/lib/msal/authConfig";
import { msalInstance } from "@/lib/msal/instance"; // MSALインスタンス
import { useBoundStore } from "@/store/store";

export const authLoader: LoaderFunction = async () => {
  try {
    const accounts = msalInstance.getAllAccounts();

    // アカウントが存在しない場合はログインリダイレクト
    if (accounts.length === 0) {
      await msalInstance.loginRedirect(loginRequest);
      return null;
    }

    // アクティブアカウントを設定
    if (!msalInstance.getActiveAccount() && accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }

    // サイレントトークン取得を試行
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      // Zustandストアに認証情報を保存
      useBoundStore.getState().setAuthData(tokenResponse);

      return { authenticated: true };
    } catch (error: unknown) {
      console.error("Silent token acquisition failed:", error);

      if (error instanceof InteractionRequiredAuthError) {
        // セッションが有効なら再度認証することなくトークンを取得
        await msalInstance.acquireTokenRedirect({
          ...loginRequest,
          account: accounts[0],
        });
        return null;
      }

      // サイレント取得に失敗した場合はログインリダイレクト
      await msalInstance.loginRedirect(loginRequest);
      return null;
    }
  } catch (error) {
    console.error("Auth loader error:", error);
    throw new Response("Authentication failed", { status: 401 });
  }
};
