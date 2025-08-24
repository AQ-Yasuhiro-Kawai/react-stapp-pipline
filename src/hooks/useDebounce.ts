import { useEffect, useRef } from "react";

/**
 * 指定された関数の呼び出しをdelayするためのカスタムフック
 * @param callbackEvent delay後に呼び出される関数
 * @param delay delayされる時間(ms)
 * @param value callbackEventに渡されるvalue
 */
function useDebounce<T>(
  callbackEvent: (value: T) => void,
  value?: T,
  delay = 300,
) {
  const callbackRef = useRef(callbackEvent);

  useEffect(() => {
    callbackRef.current = callbackEvent;
  }, [callbackEvent]);

  useEffect(() => {
    if (value === undefined) return;

    const timer = setTimeout(() => {
      if (callbackRef.current) callbackRef.current(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
}

export default useDebounce;
