// import PAGES from "@constants/pages.ts";
// import { apiErrorGuard, errorGuard } from "@utils/typeGuard.ts";
import { useMemo } from "react";
import { Button } from "@/components/ui/Button";
// import { Link } from "react-router";
import ErrorViewSeed from "../ErrorViewSeed";

type Props = {
  error: unknown;
};

function UnknownError({ error }: Props) {
  const text = useMemo(() => {
    // 仮置きなので実装するときに消す
    if (error instanceof Error) {
      return error.message;
    }
    // if (apiErrorGuard(error)) {
    //   return error.status ? `${error.status}: ${error.message}` : error.message;
    // }

    // if (errorGuard(error)) {
    //   return error.message;
    // }

    return "エラーメッセージが取得できませんでした。";
  }, [error]);

  return (
    <ErrorViewSeed errorTitle={"エラー"} showLogo>
      <p className="mb-4">{"エラーが発生しました"}</p>
      <div className="mb-4 flex flex-col items-center">
        <p>{"以下を試してみてください。"}</p>
        <ul className="list-inside list-disc text-left">
          <li>{"リロードする"}</li>
          <li>{"時間をおく"}</li>
          <li>{"再度ログインする"}</li>
          <li>{"ブラウザのキャッシュを削除する"}</li>
          <li>{"ブラウザ、端末を再起動する"}</li>
        </ul>
      </div>
      <div className="w-96 text-left">
        <p className="mb-4 whitespace-pre-wrap">
          それでも解決しない場合、以下のエラー詳細をコピーし、システム管理者に問い合わせてください。
        </p>
        <textarea
          className="mb-4 block h-20 w-full rounded-md border border-border p-2 text-sub-text"
          value={text}
        />
      </div>
      <Button asChild>
        ログイン画面へ
        {/* <Link to={PAGES.LOGIN.LINK_PATH()}>ログイン画面へ}</Link> */}
      </Button>
    </ErrorViewSeed>
  );
}

export default UnknownError;
