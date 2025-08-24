import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createLoadingSlice, type LoadingSlice } from "@/store/loadingSlice";
import { type AuthSlice, createAuthSlice } from "./auth/authSlice";
import {
  createErrorModalSlice,
  type ErrorModalSlice,
  type ErrorPayload,
} from "./errorModal/errorModalSlice";
import {
  createNotificationsLastVisitedAtSlice,
  type NotificationsLastVisitedAtSlice,
} from "./notifications/notificationsLastVisitedAtSlice";
import {
  type BreadCrumbSlice,
  createBreadCrumbSlice,
} from "./projects/breadCrumbSlice";
import { createPdfFileSlice, type FileSlice } from "./projects/pdfFileSlice";
import { createSidebarSlice, type SidebarSlice } from "./sidebarSlice";

/**
 * 実際にstoreを作る際は以下を参照する
 * https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md
 * https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#slices-pattern
 */

type BoundStore = SidebarSlice &
  LoadingSlice &
  AuthSlice &
  FileSlice &
  BreadCrumbSlice &
  NotificationsLastVisitedAtSlice &
  ErrorModalSlice;

export type StoreSlice<T> = StateCreator<
  BoundStore,
  [["zustand/immer", never]],
  [],
  T
>;

export const useBoundStore = create<BoundStore>()(
  persist(
    devtools(
      immer((...a) => ({
        ...createSidebarSlice(...a),
        ...createLoadingSlice(...a),
        ...createAuthSlice(...a),
        ...createPdfFileSlice(...a),
        ...createBreadCrumbSlice(...a),
        ...createNotificationsLastVisitedAtSlice(...a),
        ...createErrorModalSlice(...a),
      })),
    ),
    {
      name: "app-storage",
      partialize: (state) => ({
        files: state.files, // 正文書ワークフロー申請で登録するファイル
        notificationsLastVisitedAt: state.notificationsLastVisitedAt, // お知らせ画面最終訪問日時
      }),
    },
  ),
);

export const openErrorModal = (payload: ErrorPayload) =>
  useBoundStore.getState().openErrorModal(payload);
export const closeErrorModal = () => useBoundStore.getState().closeErrorModal();
