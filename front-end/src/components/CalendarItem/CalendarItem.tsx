import { CalendarEvent } from "../../context/CalendarEventsContext";
import styles from "./CalendarItem.module.scss";

interface CalendarItemProps {
  item: CalendarEvent;
}

function CalendarItem({ item }: CalendarItemProps) {
  return (
    <div className={styles.event}>
      <p>{item.title}</p>
    </div>
  );
}

export default CalendarItem;
