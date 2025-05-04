import { Routes, Route, BrowserRouter } from "react-router";
import "./App.css";
import MonthlyCalendar from "./components/MonthlyCalendar/MonthlyCalendar";
import { CalendarEventContextProvider } from "./context/CalendarEventsContext";

function App() {
  return (
    <BrowserRouter>
      <CalendarEventContextProvider>
        <Routes>
          <Route path="/" element={<MonthlyCalendar />} />
        </Routes>
      </CalendarEventContextProvider>
    </BrowserRouter>
  );
}

export default App;
