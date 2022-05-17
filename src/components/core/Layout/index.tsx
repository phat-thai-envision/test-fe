import React from "react";
import BackIcon from "components/icons/Back";
import gStyles from "App.module.scss";
import Modal from "components/core/Modal";
import cx from "classnames";
import styles from "./Layout.styles.module.scss";

interface ILayoutProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode | string | any;
  isCenter?: boolean;
  headerConfigs?: {
    title: string;
    handleBack: () => void;
  };
}

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const { children, isCenter, headerConfigs } = props;
  const renderHeaderTitle = React.useCallback(() => {
    if (!headerConfigs) {
      return null;
    }
    const { title, handleBack } = headerConfigs;
    return (
      <div className={cx(styles.header)}>
        <BackIcon handleBack={handleBack} />
        <div className={cx(gStyles.absCenterVer, styles.headerTitle)}>
          {title}
        </div>
      </div>
    );
  }, [headerConfigs]);
  return (
    <>
      <div
        className={cx(styles.layoutContainer, isCenter && styles.layoutCenter)}
      >
        {headerConfigs && renderHeaderTitle()}
        {children}
      </div>
      <Modal />
    </>
  );
};

Layout.defaultProps = {
  isCenter: false,
  headerConfigs: undefined,
};

export default React.memo(Layout);
