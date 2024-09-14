import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Stocks from '../../services/stocks';

export function useStockTask(isActive = false) {
  const [searchParams] = useSearchParams();

  const company_id = searchParams.get('company_id') || '';

  const {
    isPending: isLoading,
    data:tasks,
    isError,
  } = useQuery({
    queryKey: ['stocks-task-list', company_id],
    queryFn: () => Stocks.getStocksTask(company_id),
    enabled: isActive,
  });

  return { isLoading, tasks, error: isError };
}
