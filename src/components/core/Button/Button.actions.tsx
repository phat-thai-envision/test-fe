import React from "react";
import cx from "classnames";
import gStyles from "App.module.scss";
import styles from "./Button.styles.module.scss";

export interface IProps {
  title: string;
  isDisabled?: boolean;
  icon: React.ReactNode | React.ReactElement;
  onBtnClick?: () => void;
}

const ButtonAction: React.FC<IProps> = (props: IProps) => {
  const { title, isDisabled, icon, onBtnClick } = props;
  return (
    <button
      type="button"
      className={cx(
        gStyles.flexCenter,
        styles.buttonAction,
        isDisabled && styles.buttonDisabled
      )}
      onClick={onBtnClick}
    >
      <div className={cx(gStyles.flexCenter, styles.icon)}>{icon}</div>
      <div className={cx(styles.buttonTitle)}>{title}</div>
    </button>
  );
};

ButtonAction.defaultProps = {
  isDisabled: false,
  onBtnClick: () => null,
};

export default ButtonAction;
