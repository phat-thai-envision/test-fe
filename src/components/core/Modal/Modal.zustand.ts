import React from "react";
import { createStore } from "zustand-store";

interface ModalState {
  isVisible: boolean;
  content?: React.ReactNode | React.ReactElement | any;
}

interface ModalActions {
  setVisibleModal: ({
    isVisible,
    content,
  }: {
    isVisible: boolean;
    content?: React.ReactNode | React.ReactElement | any;
  }) => void;
}

const initialState: ModalState = {
  isVisible: false,
  content: null,
};

export const [useModalStore] = createStore<ModalState & ModalActions>(
  (set) => ({
    ...initialState,
    setVisibleModal: ({ isVisible, content }) => set({ isVisible, content }),
  }),
  "useModalStore"
);
