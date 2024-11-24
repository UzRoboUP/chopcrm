import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Stocks from '../../services/stocks';

export function useUpdateStockStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateStockSatus, isPending: isLoadingUpdateStatus } =
    useMutation({
      mutationFn: ({ ...payload }: { id: string; stock_task_status: string }) =>
        Stocks.updateStockStatus({ ...payload }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['stocks'] });
      },
      onError: (err) => {
        console.log('ERROR', err);
        message.error('Something went wrong');
      },
    });

  return {
    updateStockSatus,
    isLoadingUpdateStatus,
  };
}
