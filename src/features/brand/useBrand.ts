import { useQuery } from '@tanstack/react-query';
import Brand from '../../services/brand';

export function useBrand(a:boolean) {
  const {
    isPending: isLoading,
    data:brand,
    isError,
  } = useQuery({
    queryKey: ['brand'],
    queryFn: () => Brand.getBrand(),
    enabled:a
  });

  return { isLoading,brand , error: isError };
}
