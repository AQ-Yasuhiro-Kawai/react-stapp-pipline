import type { StoreSlice } from "../store";

type NotificationsState = {
  notificationsLastVisitedAt: string | null;
};

type NotificationsActions = {
  setNotificationsLastVisitedAt: (timestamp: string) => void;
};

export type NotificationsLastVisitedAtSlice = NotificationsState &
  NotificationsActions;

const initialState: NotificationsState = {
  notificationsLastVisitedAt: null,
};

export const createNotificationsLastVisitedAtSlice: StoreSlice<
  NotificationsLastVisitedAtSlice
> = (set) => ({
  ...initialState,
  setNotificationsLastVisitedAt: (timestamp) =>
    set((state) => {
      state.notificationsLastVisitedAt = timestamp;
    }),
});

export const notificationsSelector = (
  state: NotificationsLastVisitedAtSlice,
) => ({
  notificationsLastVisitedAt: state.notificationsLastVisitedAt,
  setNotificationsLastVisitedAt: state.setNotificationsLastVisitedAt,
});
