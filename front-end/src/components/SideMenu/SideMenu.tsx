import { useEvents } from "../../context/CalendarEventsContext";
import { useDisplay } from "../../context/DisplayContext";
import LabelList from "../LabelList/LabelList";
import styles from "./SideMenu.module.scss";

function SideMenu() {
  const { setModalType, setMonthName, setMonth, setYear } = useDisplay();
  const { allLabels} = useEvents();
  
  function createEvent() {
    setModalType("form");
  }

  function createLabel() {
    setModalType("label");
  }

  function today() {
    setMonthName(new Date().toLocaleDateString("default", { month: "long" }));
    setMonth(new Date().getMonth());
    setYear(new Date().getFullYear());
  }

  return (
    <section className={styles.side_menu}>
      <h2>Menu options</h2>
      <p>Create a new event</p>
      <button onClick={() => createEvent()}>Create event</button>
      <p>Create a new label</p>
      <button onClick={() => createLabel()}>Create label</button>
      {/* <p>Allows you to change the view (day/week/month)</p>
      <button onClick={() => console.log("view")}>Month</button> */}
      <p>Back to today</p>
      <button onClick={() => today()}>Today</button>

      <LabelList data={allLabels}/>
    </section>
  );
}

export default SideMenu;
