import type { StoreSlice } from "../store";

export type ErrorPayload = { title: string; message: React.ReactNode };

type State = {
  open: boolean;
  content: ErrorPayload | null;
};

type Actions = {
  openErrorModal: (props: ErrorPayload) => void;
  closeErrorModal: () => void;
};

const initialState: State = {
  open: false,
  content: null,
};

export type ErrorModalSlice = State & Actions;

export const createErrorModalSlice: StoreSlice<ErrorModalSlice> = (set) => ({
  ...initialState,
  openErrorModal: ({ title, message }) => {
    set((state) => {
      state.content = { title, message };
      state.open = true;
    });
  },
  closeErrorModal: () =>
    set((state) => {
      state.open = false;
      state.content = null;
    }),
});

export const errorModalSelector = (state: ErrorModalSlice) => ({
  open: state.open,
  content: state.content,
});
