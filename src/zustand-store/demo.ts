import { createStore } from "./index";

interface DemoState {
  isLoading: boolean;
}

interface DemoActions {
  fetchData(): void;
}

const initialState: DemoState = {
  isLoading: true,
};

export const [
  useDemoStore,
  {
    getState: getNewChillerMonitoringState,
    subscribe: subscribeNewChillerMonitoringStore,
  },
] = createStore<DemoState & DemoActions>(
  (set) => ({
    ...initialState,
    fetchData() {
      set({
        isLoading: false,
      });
    },
    resetStore: () => {
      set(initialState);
    },
  }),
  "Demo"
);
