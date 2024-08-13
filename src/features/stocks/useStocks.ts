import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Stocks from '../../services/stocks';

export function useStocks() {
  const [searchParams] = useSearchParams();

  const company_id = searchParams.get('company_id') || '';
  const car_brand = searchParams.get('car_brand') || '';
  const car_model = searchParams.get('car_model') || '';

  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['stocks', company_id, car_brand, car_model],
    queryFn: () => Stocks.getStocks({ company_id, car_brand, car_model }),
  });

  return { isLoading, data, error: isError };
}
