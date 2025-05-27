import { createContext, ReactNode, useContext, useState } from "react";

interface DisplayContextProviderProps {
  children: ReactNode;
}

interface DisplayContextType {
  modalOpen: boolean;
  setModalOpen: (data: boolean) => unknown;
  modalType: string | null;
  setModalType: (data: string | null) => unknown;
  month: number;
  setMonth: (data: number) => unknown;
  monthName: string;
  setMonthName: (data: string) => unknown;
  year: number;
  setYear: (data: number) => unknown;
  daysInMonth: number;
  firstDayOfMonth: number;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DisplayContext = createContext<DisplayContextType | undefined>(
  undefined
);

export const DisplayContextProvider = ({
  children,
}: DisplayContextProviderProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);

  const [month, setMonth] = useState(new Date().getMonth()); // month starts from 0: Jan, 1: Feb, 2: March, 3: April
  const [monthName, setMonthName] = useState(
    new Date().toLocaleDateString("default", { month: "long" })
  );
  const [year, setYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 0).getDay(); // day which the month starts on (monday, tuesday, etc)

  return (
    <DisplayContext.Provider
      value={{ modalOpen, setModalOpen, modalType, setModalType, month, setMonth, monthName, setMonthName, year, setYear, daysInMonth, firstDayOfMonth }}
    >
      {children}
    </DisplayContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDisplay = (): DisplayContextType => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("Something went wrong beep boop");
  }
  return context;
};
