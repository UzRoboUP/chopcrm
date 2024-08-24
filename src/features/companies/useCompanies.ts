import { useQuery } from '@tanstack/react-query';
import Company from '../../services/company';

export function useCompanies() {
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: () => Company.getCompany(),
    retry: 1,
  });

  return { isLoading, data, error: isError };
}
