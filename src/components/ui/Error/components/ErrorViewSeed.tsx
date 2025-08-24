import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  showLogo: boolean;
  errorTitle: string;
}>;

function ErrorViewSeed({ showLogo, errorTitle, children }: Props) {
  return (
    <main className="flex h-screen items-center justify-center bg-main-bg text-center">
      <div className="flex flex-col items-center gap-10">
        {showLogo && (
          <img
            alt="Document Portal ロゴ"
            className="mx-auto"
            height="48"
            src="/logo.svg"
          />
        )}
        <h1 className="flex h-[154px] items-center justify-center text-[128px] font-bold">
          {errorTitle}
        </h1>
        <div className="flex flex-col items-center gap-10">{children}</div>
      </div>
    </main>
  );
}

export default ErrorViewSeed;
