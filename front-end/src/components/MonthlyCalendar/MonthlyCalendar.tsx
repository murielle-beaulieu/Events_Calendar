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
import CalendarItem from "../CalendarItem/CalendarItem";
import { ToastContainer, toast } from "react-toastify";
import { EventFormData } from "../EventForm/event-schema";
import LabelForm from "../LabelForm/LabelForm";
import { LabelFormData } from "../LabelForm/label-schema";
import EditModal from "../EditModal/EditModal";
import UpdateEventForm from "../EventForm/UpdateEventForm";

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

  const {
    allCalendarEvents,
    allLabels,
    submitNewEvent,
    submitNewLabel,
    updateEvent,
    deleteEvent,
  } = useEvents();

  const {
    modalOpen,
    setModalOpen,
    modalType,
    setModalType,
    month,
    setMonth,
    monthName,
    setMonthName,
    year,
    daysInMonth,
    firstDayOfMonth,
  } = useDisplay();

  const [eventData, setEventData] = useState<CalendarEvent[] | null>(
    allCalendarEvents
  );
  const [labelData, setLabelData] = useState<Label[] | null>(allLabels);

  const [editModal, setEditModal] = useState<boolean>(false);
  const [editEventId, setEditEventId] = useState<number | null>(null);

  const openEditModal = (eventId: number) => {
    setEditModal(true);
    setEditEventId(eventId);
  };

  useEffect(() => {
    setEventData(allCalendarEvents);
    setLabelData(labelData);
  }, [allCalendarEvents, labelData]);

  let date = new Date();
  const [displayYear, setDisplayYear] = useState(date.getFullYear());

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
      if (date.getMonth() == 0) {
        setDisplayYear(displayYear + 1);
      }
      setMonthName(date.toLocaleDateString("default", { month: "long" }));
    }
    if (dir == "-") {
      setMonth(month - 1);
      date = new Date(year, month - 1, 1);
      if (date.getMonth() == 11) {
        setDisplayYear(displayYear - 1);
      }
      setMonthName(date.toLocaleDateString("default", { month: "long" }));
    }
  }

  const [calendarDay, setCalendarDay] = useState<null | number>(null);

  function dayModal(n: number | null, value: boolean) {
    setModalOpen(value);
    setCalendarDay(n);
  }

  // new date is month/day/year and locale date string is day/month/year
  const notify = (children: string) => toast(children);

  const createNewEvent = async (data: EventFormData) => {
    submitNewEvent(data)
      .then(() => {
        notify("Success");
        setModalType(null);
      })
      .catch((e) => console.log(e));
  };

  const createNewLabel = (data: LabelFormData) => {
    submitNewLabel(data)
      .then(() => {
        notify("Success");
        setModalType(null);
      })
      .catch((e) => console.log(e));
  };

  const removeEvent = (eventId: number) => {
    deleteEvent(eventId)
      .then(() => {
        console.log("weehoo");
      })
      .catch((e) => console.log(e));
  };

  const editEvent = (eventId: number, data: EventFormData) => {
    console.log(data);
    updateEvent(eventId, data)
      .then(() => {
        console.log("weehoo");
        notify("Success");
        setEditEventId(null);
        setModalOpen(false);
        setEditModal(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <main className={styles.cal_month}>
      <ToastContainer />
      {modalType == "form" ? (
        <Modal>
          <EventForm onSubmit={createNewEvent} />
          <button onClick={() => setModalType(null)}>Close modal</button>
        </Modal>
      ) : (
        <></>
      )}
      {modalType == "label" ? (
        <Modal>
          <LabelForm onSubmit={createNewLabel} />
          <button onClick={() => setModalType(null)}>Close modal</button>
        </Modal>
      ) : (
        <></>
      )}
      <header>
        <button onClick={() => changeMonth("-")}>last month</button>
        <h1>
          {monthName} {displayYear}
        </h1>
        <button onClick={() => changeMonth("+")}>next month</button>
      </header>
      <section className={styles.weekdays}>
        {weekdays.map((d) => {
          return (
            <div className={styles.day} key={d}>
              {d}
            </div>
          );
        })}
      </section>
      <div className={styles.month}>
        {/* Day modal, when clicked on a day it displays all events and extra info/actions (update/delete) */}
        {modalOpen ? (
          <article className={styles.modal}>
            <h2>
              {monthName} {calendarDay}
            </h2>
            <button onClick={() => dayModal(null, false)}>Close modal</button>
            {eventData?.map((e) =>
              new Date(e.eventDate).toLocaleDateString() ==
              new Date(
                `${month + 1}/${calendarDay}/${year}`
              ).toLocaleDateString() ? (
                <>
                  <CalendarItem item={e} />
                  <div>
                    <button onClick={() => removeEvent(e.id)}>Delete</button>
                    <button onClick={() => openEditModal(e.id)}>Update</button>
                  </div>
                </>
              ) : (
                <></>
              )
            )}
          </article>
        ) : (
          <></>
        )}
        {editModal ? (
          <EditModal eventId={editEventId}>
            {/* <EventForm
              onSubmit={(data) => {
                if (editEventId !== null) {
                  editEvent(editEventId, data);
                } else {
                  console.error("No event ID to edit");
                }
              }}
            /> */}
            <UpdateEventForm onSubmit={() => console.log('frog')} eventId={editEventId}/>
            <button onClick={() => setEditModal(false)}>Close</button>
          </EditModal>
        ) : (
          <></>
        )}
        {/* Display each day with the event within */}
        {daysArr.map((n) => {
          return (
            <div className={styles.cell} onClick={() => dayModal(n, true)}>
              <p>{n}</p>
              {eventData?.map((e) =>
                new Date(e.eventDate).toLocaleDateString() ==
                new Date(`${month + 1}/${n}/${year}`).toLocaleDateString() ? (
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
