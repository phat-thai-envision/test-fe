import React from "react";
import styles from "./Modal.styles.module.scss";
import { useModalStore } from "./Modal.zustand";

const BaseModal = () => {
  const { isVisible, content } = useModalStore();
  if (!isVisible) {
    return null;
  }
  return <div className={styles.modalContainer}>{content}</div>;
};
export default React.memo(BaseModal);
