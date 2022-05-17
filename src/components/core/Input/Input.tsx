import React from "react";
import cx from "classnames";
import styles from "./Input.styles.module.scss";
import BaseInputPassword from "./Input.password";
import BaseInputText from "./Input.text";
import BaseInputAmount from "./Input.amount";

export interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChangeText: (text: string) => void;
  amount?: number;
  onPressEnter?: () => void;
}

export interface ITypeBaseInputProps {
  inputWrapperClassname?: string | undefined;
  inputProps: IInputProps;
  isDisabled?: boolean;
}

interface IBaseInputProps {
  inputType?: React.HTMLInputTypeAttribute | "amount" | undefined;
  inputTitle?: string | undefined;
  inputContainerClassname?: string | undefined;
  inputProps: IInputProps;
  isDisabled?: boolean;
  rightInputTitleContent?: React.ReactNode | React.ReactElement | any;
}

const BaseInput: React.FC<IBaseInputProps> = (props: IBaseInputProps) => {
  const {
    inputType,
    inputTitle,
    inputContainerClassname,
    rightInputTitleContent,
  }: IBaseInputProps = props;
  const getInputComponent = React.useCallback(() => {
    switch (inputType) {
      case "password":
        return <BaseInputPassword {...props} />;
      case "text":
        return <BaseInputText {...props} />;
      case "amount":
        return <BaseInputAmount {...props} />;
      default:
        return null;
    }
  }, [props]);
  return (
    <div className={cx(styles.inputContainer, inputContainerClassname)}>
      <div className={styles.inputTileContainer}>
        <div className={styles.inputTitle}>{inputTitle}</div>
        {rightInputTitleContent && rightInputTitleContent}
      </div>
      {getInputComponent()}
    </div>
  );
};

BaseInput.defaultProps = {
  inputContainerClassname: "",
  inputTitle: "",
  inputType: "text",
  isDisabled: false,
  rightInputTitleContent: null,
};

export default React.memo(BaseInput);
