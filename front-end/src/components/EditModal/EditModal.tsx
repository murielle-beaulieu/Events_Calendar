import { ReactNode } from "react";
import styles from "./EditModal.module.scss";

interface EditModalProps {
  children: ReactNode;
  eventId: number | null;
}

function EditModal({ children, eventId }: EditModalProps) {
    return (
        <div className={styles.edit_modal}>
            <p>Updating event: {eventId}</p>
            {children}
        </div>
    )
}

export default EditModal;