import { Button } from "@/components/ui/Button/index.tsx";
// import PAGES from "@constants/pages.ts";
// import { useCallback } from "react";
// import { Link, useNavigate } from "react-router";
// import useTimeout from "../../modules/hooks/useTimeout.ts";
import ErrorViewSeed from "../ErrorViewSeed";

function NotFoundError() {
  // const navigate = useNavigate();

  // const redirect = useCallback(() => {
  //   navigate(PAGES.LOGIN.LINK_PATH(), { replace: true });
  // }, [navigate]);

  // const { count } = useTimeout(redirect);

  return (
    <ErrorViewSeed errorTitle="404" showLogo>
      <div className="flex flex-col items-center gap-10 text-center">
        <p className="text-base font-normal leading-normal text-dark-blue">
          アクセスできませんでした。
        </p>
        <p className="text-sm text-dark-blue">5秒後にリダイレクトされます。</p>

        <Button>
          ログイン画面へ
          {/* <Link to={PAGES.LOGIN.LINK_PATH()}>ログイン画面へ}</Link> */}
        </Button>
      </div>
    </ErrorViewSeed>
  );
}

export default NotFoundError;
