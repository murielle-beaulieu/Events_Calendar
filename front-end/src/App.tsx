import { Routes, Route, BrowserRouter } from "react-router";
import "./App.css";
import { CalendarEventContextProvider } from "./context/CalendarEventsContext";
import MonthPage from "./pages/MonthPage";
import { DisplayContextProvider } from "./context/DisplayContext";

function App() {
  return (
    <BrowserRouter>
      <CalendarEventContextProvider>
        <DisplayContextProvider>
          <Routes>
            <Route path="/" element={<MonthPage />} />
          </Routes>
        </DisplayContextProvider>
      </CalendarEventContextProvider>
    </BrowserRouter>
  );
}

export default App;
