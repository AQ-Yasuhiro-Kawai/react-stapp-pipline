export function MaintenancePage() {
  return (
    <main className="w-fill h-svh flex flex-col gap-16 items-center justify-center text-center">
      <div>
        <img
          alt="Document Portal ロゴ"
          className="h-auto"
          height="48"
          src="/logo.svg"
        />
      </div>
      <div className="text-8xl font-bold">メンテナンス中</div>
      <div>
        <p>
          ご不便をおかけしますが、
          <br />
          メンテナンスが終了するまで今しばらくお待ちください。
        </p>
      </div>
    </main>
  );
}
