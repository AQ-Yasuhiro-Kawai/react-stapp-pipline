import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

// アプリケーション全体で共通のMSALインスタンス
export const msalInstance = new PublicClientApplication(msalConfig);

// MSALインスタンスの初期化とリダイレクト処理
export const initializeMsal = async () => {
  await msalInstance.initialize();

  const response = await msalInstance.handleRedirectPromise();
  if (response) {
    msalInstance.setActiveAccount(response.account);
  }

  return msalInstance;
};
