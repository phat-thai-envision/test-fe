import cx from "classnames";
import styles from "./Asset.styles.module.scss";

export interface IProps {
  srcIcon: string;
  value: string;
  valueFormatted: string;
  isUseForModal?: boolean;
  onSelectAsset?: () => void;
}

export interface IAssetIcon {
  srcIcon: string;
  className?: string;
}

export const AssetIcon: React.FC<IAssetIcon> = ({
  srcIcon,
  className,
}: IAssetIcon) => (
  <div className={cx(styles.icon, className)}>
    <img src={srcIcon} alt="icon-currency" />
  </div>
);
AssetIcon.defaultProps = {
  className: "",
};

const Asset: React.FC<IProps> = (props: IProps) => {
  const { srcIcon, value, valueFormatted, isUseForModal, onSelectAsset } =
    props;
  return (
    <button
      type="button"
      className={cx(styles.asset, isUseForModal && styles.assetModal)}
      onClick={() => typeof onSelectAsset === "function" && onSelectAsset()}
    >
      <AssetIcon srcIcon={srcIcon} className={styles.assetIcon} />
      <div>
        <div className={styles.value}>{value}</div>
        <div className={styles.valueFormatted}>{valueFormatted}</div>
      </div>
    </button>
  );
};

Asset.defaultProps = { isUseForModal: false, onSelectAsset: () => null };

export default Asset;
