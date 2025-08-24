import type { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import type { StoreSlice } from "../store";

/**
 * UI表示などに使用するユーザー情報
 */
type Account = AccountInfo;
export type AuthState = AuthenticationResult;

type Actions = {
  setAuthData: (authInfo: AuthState) => void;
};

export type AuthSlice = AuthState & Actions;

const initialAccount: Account = {
  environment: "",
  homeAccountId: "",
  localAccountId: "",
  tenantId: "",
  username: "",
};
const initialState: AuthState = {
  accessToken: "",
  account: initialAccount,
  authority: "",
  cloudGraphHostName: "",
  correlationId: "",
  expiresOn: null,
  fromCache: false,
  idToken: "",
  idTokenClaims: {},
  msGraphHost: "",
  scopes: [],
  state: "",
  tenantId: "",
  tokenType: "",
  uniqueId: "",
};

/**
 * 認証状態の管理と操作を提供するZustandスライス
 */
export const createAuthSlice: StoreSlice<AuthSlice> = (set) => ({
  ...initialState,

  // 認証情報を更新するアクション
  setAuthData: (authInfo: AuthState) =>
    set(() => ({
      ...authInfo,
    })),
});

// selector
export const authSelector = (state: AuthSlice) => ({
  accessToken: state.accessToken,
  account: state.account,
  authority: state.authority,
  correlationId: state.correlationId,
  expiresOn: state.expiresOn,
  fromCache: state.fromCache,
  idToken: state.idToken,
  idTokenClaims: state.idTokenClaims,
  scopes: state.scopes,
  setAuthData: state.setAuthData,
  tenantId: state.tenantId,
  tokenType: state.tokenType,
  uniqueId: state.uniqueId,
});
