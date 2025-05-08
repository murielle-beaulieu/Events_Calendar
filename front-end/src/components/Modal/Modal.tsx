import { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  return <div className={styles.modal}>{children}</div>;
}

export default Modal;
