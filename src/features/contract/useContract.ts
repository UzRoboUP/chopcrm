import { useQuery } from '@tanstack/react-query';
import Contract from '../../services/contract';

export function useContract(id: string) {
  const {
    isPending: isLoadingData,
    data: retrieveData,
    isError,
  } = useQuery({
    queryKey: ['contract', id],
    queryFn: () => Contract.getContract(id),
    enabled: !!id,
  });

  return { isLoadingData, retrieveData, error: isError };
}
