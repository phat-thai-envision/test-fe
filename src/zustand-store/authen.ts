import { createPersistStore } from "zustand-store";
import EURIconURL from "assets/images/eur.svg";
import USDIconURL from "assets/images/usd.svg";
import YENIconURL from "assets/images/yen.svg";

export interface Asset {
  srcIcon: string;
  value: string;
  valueFormatted: string;
  balance: number;
  id: string;
}
interface AuthenState {
  isLoggedIn: boolean;
  password: string;
  assets: Asset[];
}

interface AuthenActions {
  handleCheckFlowLoggedIn: (cb: () => void) => void;
  handleChangePassword: (password: string) => void;
}

const initialState: AuthenState = {
  isLoggedIn: false,
  password: "",
  assets: [],
};

export const [useAuthenStore] = createPersistStore<AuthenState & AuthenActions>(
  (set, get) => ({
    ...initialState,
    handleCheckFlowLoggedIn: (cb) => {
      const isLoggedIn = "axsmaidinh".localeCompare(get().password) === 0;
      set({
        isLoggedIn,
        assets: [
          {
            value: "50 EUR",
            valueFormatted: "1,531,972 VND",
            srcIcon: EURIconURL,
            balance: 50,
            id: "EUR",
          },
          {
            value: "10,000 YEN",
            valueFormatted: "2,103,317 VND",
            srcIcon: YENIconURL,
            balance: 10000,
            id: "YEN",
          },
          {
            value: "1,000 USD",
            valueFormatted: "23,046,000 VND",
            srcIcon: USDIconURL,
            balance: 1000,
            id: "USD",
          },
        ],
      });
      if (isLoggedIn && typeof cb === "function") {
        cb();
      }
    },
    handleChangePassword: (password) => set({ password }),
  }),
  "useAuthenStore"
);
