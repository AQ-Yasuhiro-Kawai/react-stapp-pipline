import { InteractionStatus } from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthUsecase } from "@/usecases/auth/usecase";
/**
 * MSAL 認証コールバックを処理するためのコールバック コンポーネント。
 * アクセストークンを取得し、プロジェクト ページに移動する。
 */
export const Callback = () => {
  const navigate = useNavigate();
  const { accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const authUsecase = useAuthUsecase();

  useEffect(() => {
    const handleCallback = async () => {
      if (account) {
        await authUsecase.getAccessToken();
        navigate("/projects", { replace: true });
      }
    };

    if (inProgress === InteractionStatus.None) {
      handleCallback();
    }
  }, [authUsecase, account, inProgress, navigate]);

  return null; // このコンポーネントは何も表示しない
};
