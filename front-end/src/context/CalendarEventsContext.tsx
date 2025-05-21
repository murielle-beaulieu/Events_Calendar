import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import CalendarEvent from "../components/CalendarItem/CalendarItem";
import { EventFormData } from "../components/EventForm/event-schema";
import { LabelFormData } from "../components/LabelForm/label-schema";

interface CalendarEventContextProviderProps {
  children: ReactNode;
}

export interface CalendarEvent {
  id: number;
  eventDate: string;
  title: string;
  location: string;
  day: string;
  month: string;
  year: string;
  eventTime: string;
  label_id: number;
  hasHappened: boolean;
  deleted: boolean;
}

export interface Label {
  id: number;
  name: string;
}

interface CalendarEventContextType {
  allCalendarEvents: CalendarEvent[];
  allLabels: Label[];
  submitNewEvent: (data: EventFormData) => Promise<void>;
  submitNewLabel: (data: LabelFormData) => Promise<void>;
  deleteEvent: (eventId: number) => Promise<void>;
  updateEvent: (data: EventFormData) => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CalendarEventContext = createContext<
  CalendarEventContextType | undefined
>(undefined);

export const CalendarEventContextProvider = ({
  children,
}: CalendarEventContextProviderProps) => {
  const [allCalendarEvents, setAllCalendarEvents] = useState<CalendarEvent[]>(
    []
  );
  const [allLabels, setAllLabels] = useState<Label[]>([]);

  const getAllCalendarEvents = async () => {
    try {
      const response = await axios.get<CalendarEvent[]>(
        "http://localhost:8080/calendar_events"
      );
      setAllCalendarEvents(response.data);
    } catch (error) {
      throw new Error("Failed to retrieve all calendar events : " + error);
    }
  };

  const submitNewEvent = async (data: EventFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/calendar_events",
        data
      );
      getAllCalendarEvents();
      console.log("Successfully created: ", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateEvent = async (data: EventFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/calendar_events",
        data
      );
      getAllCalendarEvents();
      console.log("Successfully updated: ", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const deleteEvent = async (eventId: number) => {
    try {
      await axios.delete("http://localhost:8080/calendar_events/" + eventId);
      console.log("Successfully deleted");
      getAllCalendarEvents();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const submitNewLabel = async (data: LabelFormData) => {
    try {
      const response = await axios.post("http://localhost:8080/labels", data);
      getAllLabels();
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAllLabels = async () => {
    try {
      const response = await axios.get<Label[]>("http://localhost:8080/labels");
      setAllLabels(response.data);
    } catch (error) {
      throw new Error("Failed to retrieve all calendar events : " + error);
    }
  };

  useEffect(() => {
    getAllCalendarEvents();
    getAllLabels();
  }, []);

  return (
    <CalendarEventContext.Provider
      value={{
        allCalendarEvents,
        allLabels,
        submitNewEvent,
        submitNewLabel,
        deleteEvent,
        updateEvent
      }}
    >
      {children}
    </CalendarEventContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEvents = (): CalendarEventContextType => {
  const context = useContext(CalendarEventContext);
  if (!context) {
    throw new Error("Something went wrong beep boop");
  }
  return context;
};
