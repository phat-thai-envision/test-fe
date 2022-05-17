import React from "react";
import cx from "classnames";
import gStyles from "App.module.scss";
import Line from "components/core/Line";
import CopyIcon from "components/icons/Copy";
import SubLogo from "components/icons/SubLogo";
import styles from "./Card.styles.module.scss";

const Card = () => (
  <div className={cx(styles.card)}>
    <div className={cx(styles.header, gStyles.flexCenter)}>
      <div className={cx(gStyles.flex)}>
        <div className={cx(styles.headerTitle)}>My Wallet</div>
        <div className={cx(styles.headerDesc)}>(7300 3777 3888 3334)</div>
      </div>
      <CopyIcon />
    </div>
    <Line className={cx(styles.line)} />
    <div className={cx(styles.extraContainer)}>
      <div className={cx(styles.extra)}>
        <div className={cx(styles.extraTitle)}>1,000 USD</div>
        <div className={cx(styles.extraDesc)}>23,046,000 VND</div>
      </div>
      <div className={cx(styles.subLogo)}>
        <SubLogo />
      </div>
    </div>
  </div>
);

export default React.memo(Card);
