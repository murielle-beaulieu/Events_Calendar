import { useState } from "react";
import CalendarEvent from "../CalendarEvent/CalendarEvent";
import styles from "./MonthlyCalendar.module.scss";

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

  let date = new Date();
  console.log(date);

  const [month, setMonth] = useState(new Date().getMonth()); // month starts from 0: Jan, 1: Feb, 2: March, 3: April
  const [monthName, setMonthName] = useState(date.toLocaleDateString("default", { month: "long" }));
  const [year, setYear] = useState(new Date().getFullYear());
  const currentDayOfWeek = new Date().getDay();

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 0).getDay(); // day which the month starts on (monday, tuesday, etc)

  let d = 1;
  const daysArr: number | null[] = [];
  while (d <= firstDayOfMonth) {
    daysArr.push(null);
    d++;
  }

  for (let i: number = 1; i <= daysInMonth; i++) {
    daysArr.push(i);
  }

  const list = [
    { title: "beep", date: "30/04/2025" },
    { title: "beep", date: "01/05/2025" },
    { title: "beep", date: "03/05/2025" },
  ];

  function changeMonth(dir: string): void {
    if (dir == "+") {
      setMonth(month + 1);
      date = new Date(year, month + 1, 1);
      setMonthName(date.toLocaleDateString("default", { month: "long" }));
    }
    if (dir == "-") {
      setMonth(month - 1);
      date = new Date(year, month -1, 1);
      setMonthName(date.toLocaleDateString("default", { month: "long" }));
    }
  }


  console.log(month);
  return (
    <div>
      <h2> big ol calendar</h2>
      <h4>The day of the week is {currentDayOfWeek}</h4>
      <h4>There is {daysInMonth} days this month</h4>
      <h4>Month starts on day {firstDayOfMonth}</h4>
      <section>
        <button onClick={() => changeMonth("-")}>last month</button>
        <h1>{monthName}</h1>
        <button onClick={() => changeMonth("+")}>next month</button>
      </section>
      <div className={styles.weekdays}>
        {weekdays.map((d) => {
          return <div className={styles.day}>{d}</div>;
        })}
      </div>
      <div className={styles.month}>
        {daysArr.map((n) => {
          return (
            <div className={styles.cell}>
              <p>{n}</p>
              {list.map((e) => (e.date == `${n}/${month}/${year}` ? <CalendarEvent /> : <></>))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthlyCalendar;
