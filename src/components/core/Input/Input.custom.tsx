import React from "react";
import cx from "classnames";
import styles from "./Input.styles.module.scss";

interface IBaseInputProps {
  content: React.ReactNode | undefined;
  inputTitle?: string | undefined;
  inputContainerClassname?: string | undefined;
  isDisabled?: boolean;
  inputWrapperClassname?: string | undefined;
}

const BaseInputCustom: React.FC<IBaseInputProps> = (props: IBaseInputProps) => {
  const {
    content,
    isDisabled,
    inputWrapperClassname,
    inputTitle,
    inputContainerClassname,
  } = props;
  return (
    <div className={cx(styles.inputContainer, inputContainerClassname)}>
      <div className={styles.inputTitle}>{inputTitle}</div>
      <div
        className={cx(
          styles.inputWrapper,
          isDisabled && styles.inputDisabled,
          inputWrapperClassname
        )}
      >
        {content}
      </div>
    </div>
  );
};

BaseInputCustom.defaultProps = {
  inputWrapperClassname: "",
  inputContainerClassname: "",
  inputTitle: "",
  isDisabled: false,
};

export default React.memo(BaseInputCustom);
