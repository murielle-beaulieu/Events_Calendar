import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import CalendarEvent from "../components/CalendarItem/CalendarItem";


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
}

export const CalendarEventContext = createContext<CalendarEventContextType | undefined>(undefined);

export const CalendarEventContextProvider = ({children}:CalendarEventContextProviderProps) => {

    const [allCalendarEvents, setAllCalendarEvents] = useState<CalendarEvent[]>([]);
    const [allLabels, setAllLabels] = useState<Label[]>([]);

    const getAllCalendarEvents = async () => {
        try {
            const response = await axios.get<CalendarEvent[]>("http://localhost:8080/calendar_events");
            setAllCalendarEvents(response.data);
        } catch (error) {
            throw new Error("Failed to retrieve all calendar events : " + error);
        }
    }

    const getAllLabels = async () => {
        try {
            const response = await axios.get<Label[]>("http://localhost:8080/labels");
            setAllLabels(response.data);
        } catch (error) {
            throw new Error("Failed to retrieve all calendar events : " + error);
        }
    }

    useEffect(() => {
        getAllCalendarEvents();
        getAllLabels();
        console.log("weekeee")
    },[]);

    return (
        <CalendarEventContext.Provider value={{allCalendarEvents,allLabels}}>
            {children}
        </CalendarEventContext.Provider>
    )
};

export const useEvents = (): CalendarEventContextType => {
	const context = useContext(CalendarEventContext);
	if (!context) {
    throw new Error("Something went wrong beep boop");
	}
  	return context;
};