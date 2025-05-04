import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import CalendarEvent from "../components/CalendarEvent/CalendarEvent";


interface CalendarEventContextProviderProps {
    children: ReactNode;
}

export interface CalendarEvent {
    id: number;
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

interface CalendarEventContextType {
    allCalendarEvents: CalendarEvent[];
}

export const CalendarEventContext = createContext<CalendarEventContextType | undefined>(undefined);

export const CalendarEventContextProvider = ({children}:CalendarEventContextProviderProps) => {

    const [allCalendarEvents, setAllCalendarEvents] = useState<CalendarEvent[]>([]);

    const getAllCalendarEvents = async () => {
        try {
            const response = await axios.get<CalendarEvent[]>("http://localhost:8080/calendar_events");
            setAllCalendarEvents(response.data);
        } catch (error) {
            throw new Error("Failed to retrieve all calendar events : " + error);
        }
    }
    useEffect(() => {
        getAllCalendarEvents();
        console.log("weekeee")
    },[]);

    return (
        <CalendarEventContext.Provider value={{allCalendarEvents}}>
            {children}
        </CalendarEventContext.Provider>
    )
};

export const useCalEvents = (): CalendarEventContextType => {
	const context = useContext(CalendarEventContext);
	if (!context) {
    throw new Error("Something went wrong beep boop");
	}
  	return context;
};