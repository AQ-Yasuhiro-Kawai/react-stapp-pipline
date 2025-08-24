import { useCallback, useEffect, useState } from "react";
import type { SearchType } from "@/components/domain/Documents/types";

export const useDocumentSearch = () => {
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("document");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchWord(searchWord.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchWord]);

  const handleSearchWordChange = useCallback((value: string) => {
    setSearchWord(value);
  }, []);
  const handleSearchTypeChange = useCallback((value: SearchType) => {
    setSearchType(value);
  }, []);

  return {
    searchWord,
    debouncedSearchWord,
    searchType,
    handleSearchWordChange,
    handleSearchTypeChange,
  };
};
