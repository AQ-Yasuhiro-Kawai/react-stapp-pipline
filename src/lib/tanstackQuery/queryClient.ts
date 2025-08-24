import { MutationCache, QueryClient } from "@tanstack/react-query";
import { ERROR_MESSAGE } from "@/shared/error";
import { openErrorModal, useBoundStore } from "@/store/store";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 3,
    },
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
  mutationCache: new MutationCache({
    onError: () => {
      openErrorModal(ERROR_MESSAGE);
    },
  }),
});

/**
 * アプリ全体の通信状態を監視し、グローバルなローディングストアを更新する
 */
const updateGlobalLoader = () => {
  const isFetching = queryClient.isFetching();
  const isMutating = queryClient.isMutating();
  useBoundStore.getState().setIsLoading(isFetching + isMutating > 0);
};

// キャッシュの状態が変わるたびにリスナーが呼ばれるように設定
queryClient.getQueryCache().subscribe(updateGlobalLoader);
queryClient.getMutationCache().subscribe(updateGlobalLoader);
