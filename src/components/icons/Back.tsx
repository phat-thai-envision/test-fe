import React from "react";
import cx from "classnames";
import BackIconURL from "assets/images/back.svg";
import gStyles from "App.module.scss";
import styles from "./Icons.styles.module.scss";

const BackIcon = ({ handleBack }: { handleBack: () => void }) => (
  <button
    type="button"
    onClick={handleBack}
    className={cx(gStyles.flexCenter, styles.backIcon)}
  >
    <img src={BackIconURL} alt="back-icon" />
  </button>
);
export default React.memo(BackIcon);
