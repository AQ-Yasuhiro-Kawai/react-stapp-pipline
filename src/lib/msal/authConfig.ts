import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

// Microsoft Entra ID（旧Azure AD）のテナント固有情報
const tenantId = "a8045876-e38e-4874-b865-84d711df936d";

// アプリケーション登録時に生成されるクライアントID（アプリケーションID）
const clientId = "4de3ceeb-ec8c-45cf-9eab-0d2b7abe000f";

export const msalConfig = {
  auth: {
    authority: `https://login.microsoftonline.com/${tenantId}/v2.0`, // This is the ONLY mandatory field that you need to supply.
    clientId: clientId, // Replace the placeholder with your tenant info
    navigateToLoginRequestUrl: false, // Points to window.location.origin. You must register this URI on Microsoft Entra admin center/App Registration.
    postLogoutRedirectUri: "/projects", // If "true", will navigate back to the original request location before processing the auth code response.
    redirectUri: `${window.location.origin}/callback`,
  },
  cache: {
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean,
      ) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "User.Read",
    "Sites.Read.All",
    "Files.Read.All",
    "Files.Read",
  ],
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
// export const silentRequest = {
//     scopes: ["openid", "profile"],
//     loginHint: "example@domain.net"
// };
