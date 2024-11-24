import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Stocks from '../../services/stocks';
import { stockDriverType } from '../../context/StockDriverContext';

export function useCreateStockDrivers() {
  const {
    mutate: createStockDriver,
    isPending: isLoadingContract,
    isError: error,
  } = useMutation({
    mutationFn: (item: stockDriverType[]) =>
      Stocks.createStockDrivers(item),
    onError: (err) => message.error(err.message),
  });
  return {
    createStockDriver,
    isLoadingContract,
    error,
  };
}
