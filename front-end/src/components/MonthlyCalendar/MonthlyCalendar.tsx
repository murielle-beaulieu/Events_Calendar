import { useContext, useEffect, useState } from "react";
import styles from "./MonthlyCalendar.module.scss";
import { CalendarEvent, CalendarEventContext, useCalEvents } from "../../context/CalendarEventsContext";

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

  const [modalOpen, setModalOpen] = useState(false);
  const { allCalendarEvents } = useCalEvents();
  const [calData, setCalData] = useState<CalendarEvent[] | null>(allCalendarEvents);

  useEffect(() => {
    setCalData(allCalendarEvents);
  },[allCalendarEvents])
  
  console.log(calData);
  
  let date = new Date();
  console.log(date);

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
    daysArr.push(i) ;
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

  const [calendarDay, setCalendarDay] = useState<null|number>(null)

  function displayModal(n: number | null, value: boolean) {
    setModalOpen(value);
    setCalendarDay(n);
  }

  return (
    <div>
      <section>
        <h2> big ol calendar</h2>
        <button onClick={() => today()}>come back to today</button>
      </section>
      <header>
        <button onClick={() => changeMonth("-")}>last month</button>
        <h1>{monthName}</h1>
        <button onClick={() => changeMonth("+")}>next month</button>
      </header>
      <div className={styles.weekdays}>
        {weekdays.map((d) => {
          return <div className={styles.day}>{d}</div>;
        })}
      </div>
      <div className={styles.month}>
        {modalOpen ? <article className={styles.modal}><h1>"MEEP"</h1><h2>{monthName} {calendarDay}</h2><button onClick={() => displayModal(null, false)}>Close modal</button>
        {calData?.map((e) => 
                calendarDay != null && e.day == `${calendarDay}` && e.month == `${month}` && e.year == `${year}` ? ( <h2>meep</h2>) : (<></>)
              )}</article> : <></> }
        {daysArr.map((n) => {
          let j = 1;
          return (
            <div className={styles.cell} onClick={() => displayModal(n, true)}>
              <p>{n}</p>
              {calData?.map((e) =>
                n != null && e.day == `${n}` && e.month == `${month}` && e.year == `${year}` ? ( <h2>meep</h2>) : (<></>)
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthlyCalendar;
