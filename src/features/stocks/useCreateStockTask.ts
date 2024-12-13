import Stocks from '../../services/stocks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { CreateStockData } from './StockModal';

export function useCreateStockTask() {
  const queryClient = useQueryClient();

  const {
    mutate: createStockTask,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (data: CreateStockData) => Stocks.createStockTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stocks'] });
      message.success('Акция успешно создана');
    },
    onError: (err) => message.error(err.message),
  });

  return {
    createStockTask,
    isLoading,
    isSuccess,
  };
}
