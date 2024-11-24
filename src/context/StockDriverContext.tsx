import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface stockDriverType {
  status_stock: string;
  task: string;
  contract: string;
}

interface AppContextType {
  stockDrivers: stockDriverType[];
  addStockDriver: (item: stockDriverType) => void;
  removeStockDriver: (item: stockDriverType) => void;
  clearStockDriver: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const StockDriverProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stockDrivers, setItems] = useState<stockDriverType[]>([]);

  const addStockDriver = (item: stockDriverType) => {
    setItems((prevItems) => [...prevItems, item]);
  };
  const clearStockDriver = () => {
    setItems([]);
  };
  const removeStockDriver = (stockDriver: stockDriverType) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.contract != stockDriver.contract),
    );
  };

  return (
    <AppContext.Provider
      value={{
        stockDrivers,
        addStockDriver,
        removeStockDriver,
        clearStockDriver,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useStockDriversContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
