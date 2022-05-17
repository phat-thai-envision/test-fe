import Button from "components/core/Button/Button";
import { useModalStore } from "components/core/Modal/Modal.zustand";
import { useSendStore } from "../Send.zustand";
import styles from "./SendSuccessFullModal.styles.module.scss";

const SendSuccessFullModal = () => {
  const { setVisibleModal } = useModalStore();
  const handleClick = () => setVisibleModal({ isVisible: false });
  const { assetId } = useSendStore();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>Successfully sent</div>
        <div className={styles.desc}>
          Your <span>{assetId}</span> has been sent!
          <br />
          Thank you for using our service
        </div>
        <Button
          category="main"
          content="OK"
          onClick={handleClick}
          className={styles.btnOK}
        />
      </div>
    </div>
  );
};

export default SendSuccessFullModal;
