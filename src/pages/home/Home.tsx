import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "components/icons/Logo";
import BaseInput from "components/core/Input";
import { BaseButton } from "components/core/Button";
import { useAuthenStore } from "zustand-store/authen";
import Layout from "components/core/Layout";
import styles from "./Home.styles.module.scss";

const HomePage = React.memo(() => {
  const { handleCheckFlowLoggedIn, handleChangePassword } = useAuthenStore();
  const navigate = useNavigate();
  const handleNavigateToWalletPage = React.useCallback(() => {
    navigate("/wallet", { replace: true });
  }, [navigate]);
  const handleCheckLogin = React.useCallback(() => {
    handleCheckFlowLoggedIn(handleNavigateToWalletPage);
  }, []);
  return (
    <Layout isCenter>
      <div className={styles.homeContainer}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.homeTextTitle}>Ronin Wallet</div>
        <div className={styles.homeTextDesc}>Your Digital Passport</div>
        <BaseInput
          inputTitle="ENTER PASSWORD"
          inputType="password"
          inputContainerClassname={styles.inputContainerClassname}
          inputProps={{
            autoFocus: true,
            onPressEnter: handleCheckLogin,
            onChangeText: handleChangePassword,
          }}
        />
        <BaseButton
          category="main"
          content="Unlock"
          className={styles.unblockBtn}
          onClick={handleCheckLogin}
        />
      </div>
    </Layout>
  );
});

export default HomePage;
