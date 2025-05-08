import { createContext, ReactNode, useContext, useState } from "react";

interface DisplayContextProviderProps {
  children: ReactNode;
}

interface DisplayContextType {
  modalOpen: boolean;
  setModalOpen: (data: boolean) => unknown;
  modalType: string | null;
  setModalType: (data: string | null) => unknown;
}

export const DisplayContext = createContext<DisplayContextType | undefined>(
  undefined
);

export const DisplayContextProvider = ({
  children,
}: DisplayContextProviderProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);

  return (
    <DisplayContext.Provider
      value={{ modalOpen, setModalOpen, modalType, setModalType }}
    >
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplay = (): DisplayContextType => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("Something went wrong beep boop");
  }
  return context;
};
