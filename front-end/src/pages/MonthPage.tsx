import MonthlyCalendar from "../components/MonthlyCalendar/MonthlyCalendar";
import SideMenu from "../components/SideMenu/SideMenu";
import styles from "./MonthPage.module.scss";

function MonthPage() {
    return (
        <main className={styles.month}>
        <SideMenu/>
        <MonthlyCalendar/>
        </main>
    )
}

export default MonthPage;