import React from "react";
import cx from "classnames";
import { ITypeBaseInputProps } from "./Input";
import styles from "./Input.styles.module.scss";

const BaseInputText: React.FC<ITypeBaseInputProps> = (
  props: ITypeBaseInputProps
) => {
  const { inputWrapperClassname, inputProps } = props;
  const { onChangeText } = inputProps;
  return (
    <div className={cx(styles.inputWrapper, inputWrapperClassname)}>
      <input
        {...inputProps}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          event.preventDefault();
          if (typeof onChangeText === "function") {
            onChangeText(event.target.value);
          }
        }}
      />
    </div>
  );
};

BaseInputText.defaultProps = {
  inputWrapperClassname: "",
  isDisabled: false,
};

export default React.memo(BaseInputText);
