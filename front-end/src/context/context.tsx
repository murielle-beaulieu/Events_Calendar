import { createContext, ReactNode } from "react";


interface CalendarDateContextProviderProps {
    children: ReactNode;
}

export const CalendarDateContext = createContext<undefined | string>(undefined);

export const CalendarDateContextProvider = ({children}:CalendarDateContextProviderProps) => {
    return (
        <CalendarDateContext.Provider value={"meep"}>
            {children}
        </CalendarDateContext.Provider>
    )
}