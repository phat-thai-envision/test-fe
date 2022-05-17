import React from "react";
import cx from "classnames";
import CloseIcon from "components/icons/Close";
import { useModalStore } from "components/core/Modal/Modal.zustand";
import Line from "components/core/Line";
import { useAuthenStore } from "zustand-store/authen";
import Asset from "components/core/Asset";
import styles from "./SelectAssetContentModal.styles.module.scss";
import { useSendStore } from "../Send.zustand";

const Header = () => {
  const { setVisibleModal } = useModalStore();
  return (
    <div className={cx(styles.header)}>
      <div className={cx(styles.headerTitle)}>
        Assets
        <CloseIcon
          handleClose={() => setVisibleModal({ isVisible: false })}
          className={styles.closeIcon}
        />
      </div>
    </div>
  );
};

const Assets = () => {
  const { assets } = useAuthenStore();
  const { handleChangeAsset, handleChangeAmount } = useSendStore();
  const { setVisibleModal } = useModalStore();
  return (
    <div>
      {assets.map((asset) => (
        <Asset
          isUseForModal
          {...asset}
          key={asset.srcIcon}
          onSelectAsset={() => {
            handleChangeAmount("");
            handleChangeAsset(asset.id);
            setVisibleModal({ isVisible: false });
          }}
        />
      ))}
    </div>
  );
};

const SelectAssetContentModal = () => {
  const { setVisibleModal } = useModalStore();
  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.content)}>
        <Header />
        <Line />
        <Assets />
      </div>
    </div>
  );
};

export default SelectAssetContentModal;
