import React from "react";
import cx from "classnames";
import ButtonAction, {
  IProps as IBtnActionProps,
} from "components/core/Button/Button.actions";
import DepositIcon from "components/icons/Deposit";
import SendIcon from "components/icons/Send";
import SwapIcon from "components/icons/Swap";
import UserSettingIcon from "components/icons/UserSetting";
import globalStyles from "App.module.scss";
import Layout from "components/core/Layout";
import Card from "components/core/ Card";
import Asset from "components/core/Asset";
import { useNavigate } from "react-router-dom";
import { useAuthenStore } from "zustand-store/authen";
import styles from "./Wallet.styles.module.scss";

const Header = () => (
  <div className={cx(styles.headerContainer, globalStyles.flex)}>
    <div className={cx(styles.headerLeftCol, globalStyles.flexCenter)}>
      <div className={cx(styles.headerLeftColTitle)}>Ronin Wallet</div>
    </div>
    <div className={cx(styles.headerRightCol)}>
      <UserSettingIcon />
    </div>
  </div>
);

const GroupActions = () => {
  const navigate = useNavigate();
  const buttonFactories: IBtnActionProps[] = React.useMemo(
    () => [
      {
        title: "Deposit",
        icon: <DepositIcon />,
        isDisabled: true,
      },
      {
        title: "Send",
        icon: <SendIcon />,
        onBtnClick: () => navigate("/send"),
      },
      {
        title: "Swap",
        icon: <SwapIcon />,
        isDisabled: true,
      },
    ],
    []
  );
  return (
    <div className={cx(globalStyles.flexCenter, styles.groupActions)}>
      {buttonFactories.map((data) => (
        <ButtonAction key={data.title} {...data} />
      ))}
    </div>
  );
};

const Assets = () => {
  const { assets } = useAuthenStore();
  return (
    <div className={styles.assetsContainer}>
      <div className={styles.assets}>Assets</div>
      {assets.map((asset) => (
        <Asset {...asset} key={asset.srcIcon} />
      ))}
    </div>
  );
};

const Wallet = () => (
  <Layout>
    <div className={globalStyles.layoutPadding20}>
      <Header />
      <Card />
      <GroupActions />
      <Assets />
    </div>
  </Layout>
);

export default React.memo(Wallet);
