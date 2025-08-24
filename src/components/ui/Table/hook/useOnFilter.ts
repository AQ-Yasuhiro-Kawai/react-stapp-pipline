import { useCallback } from "react";
import type { SetURLSearchParams } from "react-router";

export const useOnFilter = (setSearchParams: SetURLSearchParams) => {
  const onFilter = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (newParams.has("page")) {
          newParams.delete("page");
        }
        if (value !== "") {
          newParams.set("searchWord", value);
        } else {
          newParams.delete("searchWord");
        }
        return newParams;
      });
    },
    [setSearchParams],
  );

  return {
    onFilter,
  };
};
