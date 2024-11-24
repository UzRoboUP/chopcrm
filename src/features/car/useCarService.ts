
import Car from '../../services/car';
import { useQuery } from '@tanstack/react-query';

export function useCarService() {
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['car-status',],
    queryFn: () => Car.getCarServiceList(),
    retry: 1,
  });

  return { isLoading, data, error: isError };
}
