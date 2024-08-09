import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Stocks from '../../services/stocks';

export function useStocks() {
  const [searchParams] = useSearchParams();

  const company_id = searchParams.get('company_id') || '';

  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['stocks', company_id],
    queryFn: () => Stocks.getStocks({ company_id }),
  });

  return { isLoading, data, error: isError };
}
