import React from "react";
import cx from "classnames";
import Eye from "components/icons/Eye";
import { ITypeBaseInputProps } from "./Input";
import styles from "./Input.styles.module.scss";

const BaseInputPassword: React.FC<ITypeBaseInputProps> = (
  props: ITypeBaseInputProps
) => {
  const { inputWrapperClassname, inputProps } = props;
  const { onPressEnter, onChangeText, ...rest } = inputProps;
  const [visibleContent, setVisibleContent] = React.useState(false);
  return (
    <div className={cx(styles.inputWrapper, inputWrapperClassname)}>
      <input
        {...rest}
        type={visibleContent ? "text" : "password"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          event.preventDefault();
          if (typeof onChangeText === "function") {
            onChangeText(event.target.value);
          }
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter" && typeof onPressEnter === "function") {
            onPressEnter();
          }
        }}
      />
      <button
        type="button"
        className={cx(styles.icon, styles.eyeIcon)}
        onClick={() => setVisibleContent(!visibleContent)}
      >
        <Eye />
      </button>
    </div>
  );
};

BaseInputPassword.defaultProps = {
  inputWrapperClassname: "",
  isDisabled: false,
};

export default React.memo(BaseInputPassword);
