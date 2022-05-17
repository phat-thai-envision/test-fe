import React from "react";
import cx from "classnames";
import CloseIconURL from "assets/images/close.svg";
import gStyles from "App.module.scss";
import styles from "./Icons.styles.module.scss";

interface ICloseIcon {
  handleClose: () => void;
  className?: string;
}

const CloseIcon: React.FC<ICloseIcon> = ({
  handleClose,
  className,
}: ICloseIcon) => (
  <button
    type="button"
    onClick={handleClose}
    className={cx(gStyles.flexCenter, styles.backIcon, className)}
  >
    <img src={CloseIconURL} alt="close-icon" />
  </button>
);

CloseIcon.defaultProps = {
  className: "",
};
export default React.memo(CloseIcon);
