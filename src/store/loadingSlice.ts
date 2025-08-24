import type { StoreSlice } from "./store";

export interface LoadingState {
  isLoading: boolean;
}

export interface LoadingActions {
  setIsLoading: (isLoading: boolean) => void;
}

export type LoadingSlice = LoadingState & LoadingActions;

export const createLoadingSlice: StoreSlice<LoadingSlice> = (set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
});
