import { useDisplay } from "../../context/DisplayContext";
import styles from "./SideMenu.module.scss";

function SideMenu() {
  const { setModalType, setMonthName, setMonth, setYear } = useDisplay();

  function createEvent() {
    setModalType("form");
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
      <button onClick={() => console.log("label")}>Create label</button>
      {/* <p>Allows you to change the view (day/week/month)</p>
      <button onClick={() => console.log("view")}>Month</button> */}
      <p>Back to today</p>
      <button onClick={() => today()}>Today</button>
    </section>
  );
}

export default SideMenu;
