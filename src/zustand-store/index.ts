import create, { StateCreator, UseBoundStore, StoreApi } from "zustand";
import { persist, devtools as DevToolsExtension } from "zustand/middleware";

export function createStore<
  TState extends Record<string | number | symbol, any>
>(
  createState: StateCreator<TState, [["zustand/devtools", never]], [], TState>,
  storeName: string
): [
  UseBoundStore<StoreApi<TState>>,
  StoreApi<TState & { [key: string]: unknown }>
] {
  const store = create(
    DevToolsExtension(createState, {
      enabled: true,
      name: storeName,
      anonymousActionType: `[Zustand][${storeName}-Store]`,
    })
  );
  return [
    store,
    {
      setState: store.setState,
      getState: store.getState,
      subscribe: store.subscribe,
      destroy: store.destroy,
    },
  ];
}

export function createPersistStore<
  TState extends Record<string | number | symbol, any>
>(
  createState: StateCreator<TState, [["zustand/persist", unknown]], [], TState>,
  storeName: string
): [
  UseBoundStore<StoreApi<TState>>,
  StoreApi<TState & { [key: string]: unknown }>
] {
  const store = create(
    persist(createState, {
      name: storeName,
      getStorage: () => localStorage,
    })
  );
  return [
    store,
    {
      setState: store.setState,
      getState: store.getState,
      subscribe: store.subscribe,
      destroy: store.destroy,
    },
  ];
}
