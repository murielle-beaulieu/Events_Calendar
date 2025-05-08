import { useEffect, useState } from "react";
import styles from "./MonthlyCalendar.module.scss";
import {
  CalendarEvent,
  Label,
  useEvents,
} from "../../context/CalendarEventsContext";
import EventForm from "../EventForm/EventForm";
import Modal from "../Modal/Modal";
import { useDisplay } from "../../context/DisplayContext";
import { EventFormData } from "../EventForm/schema";
import CalendarItem from "../CalendarItem/CalendarItem";

function MonthlyCalendar() {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const { allCalendarEvents, allLabels } = useEvents();
  const { modalOpen, setModalOpen, modalType, setModalType } = useDisplay();

  const [eventData, setEventData] = useState<CalendarEvent[] | null>(
    allCalendarEvents
  );
  const [labelData, setLabelData] = useState<Label[] | null>(allLabels);

  useEffect(() => {
    setEventData(allCalendarEvents);
    setLabelData(labelData);
  }, [allCalendarEvents, labelData]);

  let date = new Date();

  const [month, setMonth] = useState(new Date().getMonth()); // month starts from 0: Jan, 1: Feb, 2: March, 3: April
  const [monthName, setMonthName] = useState(
    date.toLocaleDateString("default", { month: "long" })
  );
  const [year, setYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 0).getDay(); // day which the month starts on (monday, tuesday, etc)

  let d = 1;
  const daysArr: (number | null)[] = [];
  while (d <= firstDayOfMonth) {
    daysArr.push(null);
    d++;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    daysArr.push(i);
  }

  function changeMonth(dir: string): void {
    if (dir == "+") {
      setMonth(month + 1);
      date = new Date(year, month + 1, 1);
      setMonthName(date.toLocaleDateString("default", { month: "long" }));
    }
    if (dir == "-") {
      setMonth(month - 1);
      date = new Date(year, month - 1, 1);
      setMonthName(date.toLocaleDateString("default", { month: "long" }));
    }
  }

  function today() {
    setMonthName(date.toLocaleDateString("default", { month: "long" }));
    setMonth(new Date().getMonth());
    setYear(new Date().getFullYear());
  }

  const [calendarDay, setCalendarDay] = useState<null | number>(null);

  function dayModal(n: number | null, value: boolean) {
    setModalOpen(value);
    setCalendarDay(n);
  }

  // new date is month/day/year and locale date string is day/month/year
  // console.log(new Date(`${month}/1/${year}`).toLocaleDateString());

  const submitNewEvent = (data: EventFormData) => {
    console.log(data.title);
  };

  return (
    <main className={styles.cal_month}>
      {modalType == "form" ? (
        <Modal>
          <EventForm onSubmit={submitNewEvent} />
          <button onClick={() => setModalType(null)}>Close modal</button>
        </Modal>
      ) : (
        <></>
      )}
      <header>
        <button onClick={() => changeMonth("-")}>last month</button>
        <h1>{monthName}</h1>
        <button onClick={() => changeMonth("+")}>next month</button>
      </header>
      <div>
        <button onClick={() => today()}>today</button>
      </div>
      <div className={styles.weekdays}>
        {weekdays.map((d) => {
          return <div className={styles.day}>{d}</div>;
        })}
      </div>
      {}
      <div className={styles.month}>
        {modalOpen ? (
          <article className={styles.modal}>
            <h1>This is the day modal</h1>
            <h2>
              {monthName} {calendarDay}
            </h2>
            <button onClick={() => dayModal(null, false)}>Close modal</button>
            {eventData?.map((e) =>
              calendarDay != null &&
              e.day == `${calendarDay}` &&
              e.month == `${month}` &&
              e.year == `${year}` ? (
                <CalendarItem item={e} />
              ) : (
                <></>
              )
            )}
          </article>
        ) : (
          <></>
        )}
        {daysArr.map((n) => {
          return (
            <div className={styles.cell} onClick={() => dayModal(n, true)}>
              <p>{n}</p>
              {eventData?.map((e) =>
                new Date(e.eventDate).toLocaleDateString() ==
                new Date(`${month}/${n}/${year}`).toLocaleDateString() ? (
                  <CalendarItem item={e} />
                ) : (
                  <></>
                )
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default MonthlyCalendar;
