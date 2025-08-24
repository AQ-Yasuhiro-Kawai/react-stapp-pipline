/// <reference types="vite/client" />

// このinterfaceの中に環境変数を追加しTypeScriptに認識させる
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_AUTH_CLIENT_ID: string;
  readonly VITE_AUTH_TENANT_ID: string;
}

// この interface は触らない
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
