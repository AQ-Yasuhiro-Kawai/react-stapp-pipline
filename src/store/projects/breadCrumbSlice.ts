import type { Project } from "@/domain/Projects/type";
import type { StoreSlice } from "../store";

type BreadCrumbs = {
  id: Project["items"][number]["providerItemId"];
  driveId: Project["items"][number]["driveId"];
  label: Project["items"][number]["itemName"];
};

type BreadCrumbState = {
  breadCrumbs: BreadCrumbs[];
};

type Actions = {
  setBreadCrumbs: (item: BreadCrumbs) => void;
  clearBreadCrumbs: () => void;
};

export type BreadCrumbSlice = BreadCrumbState & Actions;
const initialState: BreadCrumbState = {
  breadCrumbs: [
    {
      id: "",
      driveId: "",
      label: "トップ",
    },
  ],
};

export const createBreadCrumbSlice: StoreSlice<BreadCrumbSlice> = (set) => ({
  ...initialState,

  setBreadCrumbs: (item: BreadCrumbs) =>
    set((state) => {
      // itemが既に存在する場合は、そのitem以降の要素を削除
      const existingIndex = state.breadCrumbs.findIndex(
        (crumb) => crumb.id === item.id && crumb.driveId === item.driveId,
      );
      if (existingIndex !== -1) {
        state.breadCrumbs = state.breadCrumbs.slice(0, existingIndex + 1);
        return;
      }
      state.breadCrumbs.push(item);
    }),

  clearBreadCrumbs: () =>
    set((state) => {
      state.breadCrumbs = [...initialState.breadCrumbs];
    }),
});

export const breadCrumbsSelector = (state: BreadCrumbSlice) => ({
  breadCrumbs: state.breadCrumbs,
  setBreadCrumbs: state.setBreadCrumbs,
  clearBreadCrumbs: state.clearBreadCrumbs,
});
