import { useQuery } from '@tanstack/react-query';
import Operator from '../../services/operator';

export function useOperators() {
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['operators'],
    queryFn: () => Operator.getOperators(),
  });

  return { isLoading, data, error: isError };
}
