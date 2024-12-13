import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface companyDriverType {
  status_contract: string;
  driver: string;
  company: string;
  contract_duration: number;
}

type companyDriverCountType = { count: number; driverId: string };

interface AppContextType {
  companyDrivers: companyDriverType[];
  addCompanyDriver: (item: companyDriverType) => void;
  removeCompanyDriver: (item: companyDriverType) => void;
  clearCompanyDriver: () => void;
  changeCompanyDriverCount: (item: companyDriverCountType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const CompanyDriverProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [companyDrivers, setItems] = useState<companyDriverType[]>([]);

  const addCompanyDriver = (item: companyDriverType) => {
    setItems((prevItems) => [...prevItems, item]);
  };
  const clearCompanyDriver = () => {
    setItems([]);
  };
  const removeCompanyDriver = (stockDriver: companyDriverType) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.driver != stockDriver.driver),
    );
  };
  const changeCompanyDriverCount = (data: companyDriverCountType) => {
    const d = companyDrivers.map((item) => {
      if (item.driver == data.driverId) {
        item.contract_duration = data.count;
      }
      return item;
    });
    setItems(d);
  };
  console.log(companyDrivers);

  return (
    <AppContext.Provider
      value={{
        companyDrivers,
        addCompanyDriver,
        removeCompanyDriver,
        clearCompanyDriver,
        changeCompanyDriverCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCompanyDriverContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
