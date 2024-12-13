import React, { createContext, useState, useContext, ReactNode } from 'react';

// Context uchun interfeys
interface StockTaskContextType {
  stockTaskText: string;
  setStockTaskText: (newValue: string) => void;
}

// Contextni yaratish
const StockTaskContext = createContext<StockTaskContextType | undefined>(undefined);

// Provider komponenti uchun props interfeysi
interface StringProviderProps {
  children: ReactNode;
}

// Provider komponenti
export const StockTaskProvider: React.FC<StringProviderProps> = ({ children }) => {
  const [stockTaskText, setStockTaskText] = useState<string>("...");

  return (
    <StockTaskContext.Provider value={{ stockTaskText, setStockTaskText }}>
      {children}
    </StockTaskContext.Provider>
  );
};

// Custom hook: Contextni qulay foydalanish uchun
export const useStockTaskContext = (): StockTaskContextType => {
  const context = useContext(StockTaskContext);
  if (!context) {
    throw new Error("useStockTaskContext must be used within a StringProvider");
  }
  return context;
};
