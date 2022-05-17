import React from "react";
import cx from "classnames";
import styles from "./Button.styles.module.scss";

interface IBaseButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  category?: "main" | "sub" | undefined;
  content?: React.ReactNode | string;
  className?: string | undefined;
}

const BaseButton: React.FC<IBaseButtonProps> = (props: IBaseButtonProps) => {
  const { category = "main", content, className, ...rest } = props;
  return (
    <button
      type="button"
      className={cx(styles.button, styles[category], className)}
      {...rest}
    >
      {content}
    </button>
  );
};

BaseButton.defaultProps = {
  content: "Button Title",
  className: "",
  category: "main",
};

export default React.memo(BaseButton);
