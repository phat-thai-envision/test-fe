import React from "react";
import cx from "classnames";
import { ITypeBaseInputProps } from "./Input";
import styles from "./Input.styles.module.scss";

const BaseInputAmount: React.FC<ITypeBaseInputProps> = (
  props: ITypeBaseInputProps
) => {
  const { inputWrapperClassname, inputProps } = props;
  const { onChangeText, amount } = inputProps;
  return (
    <div className={cx(styles.inputWrapper, inputWrapperClassname)}>
      <input
        type="text"
        {...inputProps}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          event.preventDefault();
          if (typeof onChangeText === "function") {
            onChangeText(event.target.value);
          }
        }}
      />
      <div className={styles.rightInputAmount}>
        <button
          type="button"
          className={styles.max}
          onClick={() => onChangeText(String(amount))}
        >
          MAX
        </button>
      </div>
    </div>
  );
};

BaseInputAmount.defaultProps = {};

export default React.memo(BaseInputAmount);
