import BaseInput, { BaseInputCustom, inputStyles } from "components/core/Input";
import Layout from "components/core/Layout";
import cx from "classnames";
import React from "react";
import AssetCurrencyURL from "assets/images/asset_currency.svg";
import { useNavigate } from "react-router-dom";
import gStyles from "App.module.scss";
import { Asset } from "zustand-store/authen";
import { AssetIcon } from "components/core/Asset";
import { useModalStore } from "components/core/Modal/Modal.zustand";
import SelectAssetContentModal from "pages/send/SelectAssetContentModal";
import Button from "components/core/Button/Button";
import styles from "./Send.styles.module.scss";
import { useSendStore } from "./Send.zustand";
import { useCurrentAsset } from "./Send.hook";
import SendSuccessFullModal from "./SendSuccessFullModal";

const InputGroup = () => {
  const { handleChangeAmount, handleChangeTo, amount, to } = useSendStore();
  const { setVisibleModal } = useModalStore();
  const asset: Asset = useCurrentAsset();
  if (!asset) {
    return null;
  }
  return (
    <>
      <BaseInputCustom
        inputContainerClassname={gStyles.mB16}
        inputTitle="FROM"
        content={
          <div className={cx(inputStyles.inputContent, styles.content)}>
            <div className={styles.contentTitle}>My Wallet</div>
            <div className={styles.contentDesc}>(7300...3334)</div>
          </div>
        }
        isDisabled
      />
      <BaseInput
        inputContainerClassname={gStyles.mB16}
        inputTitle="TO"
        inputType="text"
        inputProps={{
          onChangeText: handleChangeTo,
          value: to,
        }}
      />
      <BaseInputCustom
        inputContainerClassname={gStyles.mB16}
        inputTitle="ASSET"
        content={
          <div
            className={cx(
              inputStyles.inputContent,
              gStyles.flexCenter,
              styles.assetContent
            )}
          >
            <div className={cx(gStyles.flexCenter, styles.leftAssetsContent)}>
              <AssetIcon srcIcon={asset.srcIcon} />
              <div className={styles.assetId}>{asset.id}</div>
            </div>
            <button
              type="button"
              className={styles.rightAssetsContent}
              onClick={() =>
                setVisibleModal({
                  isVisible: true,
                  content: <SelectAssetContentModal />,
                })
              }
            >
              <img src={AssetCurrencyURL} alt="asset-currency" />
            </button>
          </div>
        }
      />
      <BaseInput
        inputContainerClassname={gStyles.mB16}
        inputTitle="AMOUNT"
        inputType="amount"
        inputProps={{
          onChangeText: handleChangeAmount,
          amount: asset.balance,
          value: amount,
        }}
      />
    </>
  );
};

const ButtonGroups = () => {
  const navigate = useNavigate();
  const { setVisibleModal } = useModalStore();
  const handleSend = () =>
    setVisibleModal({ isVisible: true, content: <SendSuccessFullModal /> });
  const handleCancel = () => navigate(-1);
  return (
    <div className={styles.buttonGroups}>
      <Button category="sub" content="Cancel" onClick={handleCancel} />
      <Button category="main" content="Send" onClick={handleSend} />
    </div>
  );
};

const SendForm = () => (
  <div className={styles.sendForm}>
    <InputGroup />
    <ButtonGroups />
  </div>
);

const Send = () => {
  const navigate = useNavigate();
  return (
    <Layout headerConfigs={{ title: "Send", handleBack: () => navigate(-1) }}>
      <div className={cx(gStyles.layoutPadding20, styles.sendContainer)}>
        <SendForm />
      </div>
    </Layout>
  );
};
export default Send;
