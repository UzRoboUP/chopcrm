import { useQuery } from '@tanstack/react-query';
import Brand from '../../services/brand';

export function useBrand() {
  const {
    isPending: isLoading,
    data:brand,
    isError,
  } = useQuery({
    queryKey: ['brand'],
    queryFn: () => Brand.getBrand(),
  });

  return { isLoading,brand , error: isError };
}
