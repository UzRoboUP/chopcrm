import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Stocks from '../../services/stocks';

export function useStocksTask() {
  const [searchParams] = useSearchParams();

  const company_id = searchParams.get('company_id') || '';
  const stock_type = searchParams.get('stock_type') || '';
  const stock_task_status = searchParams.get('stock_task_status') || '';

  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['stocks', company_id,stock_type,stock_task_status ],
    queryFn: () => Stocks.getStocksTask({ company_id,stock_type,stock_task_status}),
  });

  return { isLoading, data, error: isError };
}
