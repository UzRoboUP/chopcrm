import { useEffect, useState } from 'react';
import {
  stockDriverType,
  useStockDriversContext,
} from '../context/StockDriverContext';
export default function DriverCreateButton({
  contract,
  task,
}: {
  contract: string;
  task: string;
}) {
  const [active, setActive] = useState(false);
  const { addStockDriver, removeStockDriver } = useStockDriversContext();

  useEffect(() => {
    const stockDriver: stockDriverType = {
      contract: contract,
      status_stock: 'pending',
      task: task,
    };
    if (active) {
      addStockDriver(stockDriver);
    } else {
      removeStockDriver(stockDriver);
    }
  }, [active]);

  return (
    <>
      <button
        style={{
          backgroundColor: active ? '#7F8788' : '#30B0C7',
        }}
        className="card__footer--btn"
        onClick={() => {
          setActive(!active);
        }}
      >
        Выбрать
      </button>
    </>
  );
}
// 