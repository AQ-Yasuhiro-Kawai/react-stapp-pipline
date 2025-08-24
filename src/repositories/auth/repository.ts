import type { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useMemo } from "react";
import { loginRequest } from "@/lib/msal/authConfig";

type MsalInstance = IPublicClientApplication;

const createAuthRepository = (instance: MsalInstance) => {
  return {
    getAccessToken: async () => {
      const token = await instance.acquireTokenSilent(loginRequest);
      return token;
    },
    // ログイン処理
    login: async () => {
      await instance.loginRedirect();
    },
    // ログアウト
    logout: async () => {
      const account = instance.getActiveAccount();
      if (account) {
        await instance.logoutRedirect({ account });
      }
    },
  };
};

export const useAuthRepository = () => {
  const { instance } = useMsal();

  return useMemo(() => createAuthRepository(instance), [instance]);
};

export type AuthRepository = ReturnType<typeof createAuthRepository>;
