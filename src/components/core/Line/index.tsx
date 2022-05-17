import React from "react";
import cx from "classnames";
import styles from "./Line.styles.module.scss";

interface ILineProps {
  className?: string;
}

const Line: React.FC<ILineProps> = ({ className }) => (
  <div className={cx(styles.line, className)} />
);

Line.defaultProps = {
  className: "",
};

export default Line;
