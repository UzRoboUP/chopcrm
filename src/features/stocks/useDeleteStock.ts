import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Stocks from '../../services/stocks';

export function useDeleteStock() {
  const {
    mutate: deleteStock,
    isPending: isLoadingDelete,
    isError: error,
  } = useMutation({
    mutationFn: (id: string) => Stocks.deleteStockEmployee(id),
    onError: (err) => message.error(err.message),
  });

  return {
    deleteStock,
    isLoadingDelete,
    error,
  };
}
