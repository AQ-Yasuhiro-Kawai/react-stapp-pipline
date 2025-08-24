import { useEffect, useRef, useState } from "react";

/**
 * 指定秒数後にタイムアウトしてfallbackを実行するカスタムフック
 * @param fallback
 * @param second
 */
function useTimeout(fallback?: () => void, second = 5) {
  const [isTimeout, setIsTimeout] = useState(false);
  const [count, setCount] = useState(second);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // secondが0以下の場合は即座にタイムアウト
    if (second <= 0) {
      setIsTimeout(true);
      setCount(0);
      fallback?.();
      return;
    }

    // 動作としてはtimeoutだが、カウントダウンを行うため、setIntervalを使用
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 0) {
          setIsTimeout(true);
          fallback?.();

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [second, fallback]);

  return { count, isTimeout };
}

export default useTimeout;
