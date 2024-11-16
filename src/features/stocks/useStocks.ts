import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Stocks from '../../services/stocks';

export function useStocks() {
  const [searchParams] = useSearchParams();

  const company_id = searchParams.get('company_id') || '';
  const car_brand = searchParams.get('car_brand') || '';
  const task_id = searchParams.get('task_id') || '';
  const car_model = searchParams.get('car_model') || '';
  const search = searchParams.get('search') || '';
  const status_stock = searchParams.get('status_stock') || '';

  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['stocks', company_id, car_brand, car_model,search,status_stock,task_id],
    queryFn: () => Stocks.getStocks({ company_id, car_brand, car_model,search,status_stock,task_id }),
  });

  return { isLoading, data, error: isError };
}
