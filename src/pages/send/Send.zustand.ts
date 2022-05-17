import { createStore } from "zustand-store";

interface SendState {
  to: string;
  amount: string;
  assetId: string;
  isVisibleModalSelectCurrent: boolean;
}

interface SendActions {
  handleChangeAmount: (text: string) => void;
  handleChangeTo: (text: string) => void;
  handleChangeAsset: (assetId: string) => void;
  setVisibleModalSelectCurrent: (isVisible: boolean) => void;
}

const initialState: SendState = {
  to: "",
  amount: "",
  assetId: "EUR",
  isVisibleModalSelectCurrent: false,
};

export const [useSendStore] = createStore<SendState & SendActions>(
  (set, get) => ({
    ...initialState,
    handleChangeAmount: (amount) => set({ amount }),
    handleChangeTo: (to) => set({ to }),
    handleChangeAsset: (assetId) => set({ assetId }),
    setVisibleModalSelectCurrent: () =>
      set({ isVisibleModalSelectCurrent: !get().isVisibleModalSelectCurrent }),
  }),
  "useSendStore"
);
