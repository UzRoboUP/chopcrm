import { useQuery } from '@tanstack/react-query';
import Company from '../../services/company';

export function useCompany() {
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['Company'],
    queryFn: () => Company.getCompany(),
  });
  const company = data?.results;

  return { isLoading, company, error: isError };
}
