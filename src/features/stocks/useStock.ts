import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import Stocks from '../../services/stocks';

export function useStock() {
  const param = useParams();
  const [params] = useSearchParams();
  const car_brand = params.get('car_brand') || '';
  const car_model = params.get('car_model') || '';
  const status_stock = params.get('status_stock') || '';
 
  const {
    isPending: isLoadingTask,
    data: tasks,
    isError,
  } = useQuery({
    queryKey: ['stock-list', param, car_model, car_brand,status_stock],
    queryFn: () =>
      Stocks.getStocks({ task_id: param.task_id, car_model, car_brand ,status_stock}),
  });

  return { isLoadingTask, tasks, error: isError };
}
