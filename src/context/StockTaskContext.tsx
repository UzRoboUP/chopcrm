import { createContext, ReactNode, useState } from 'react';
type StockTaskType = {
  stockTaskText: string;
  setStockTaskText: (a: string) => void;
};
export const StockTaskContext = createContext<StockTaskType | ''>('');

const StockTaskProvider = ({ children }: { children: ReactNode }) => {
  const [stockTaskText, setStockTaskText] = useState('');
  return (
    <StockTaskContext.Provider value={{ stockTaskText, setStockTaskText }}>
      {children}
    </StockTaskContext.Provider>
  );
};
export default StockTaskProvider;
