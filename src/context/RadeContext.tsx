import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Rate {
  tarif_name: string;
  price: number;
  number_of_car: number;
  car_sides: string[];
  id?:string
}


interface RateContextType {
  rates: Rate[];
  addRate: (rate: Rate) => void;
  filteredRate:(rate:Rate[])=>void;
}


const RateContext = createContext<RateContextType | undefined>(undefined);


export const RateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<Rate[]>([]);

  
  const addRate = (rate: Rate) => {
    setRates((prevRates) => [...prevRates, rate]);
  };

  

  const filteredRate = (rate: Rate[]) => {
    setRates(rate);
  };

  return (
    <RateContext.Provider value={{ rates, addRate,filteredRate }}>
      {children}
    </RateContext.Provider>
  );
};


export const useRateContext = (): RateContextType => {
  const context = useContext(RateContext);
  if (!context) {
    throw new Error('useRateContext must be used within a RateProvider');
  }
  return context;
};
