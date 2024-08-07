import { useQuery } from '@tanstack/react-query';
import Api from '../services/index';

export function useClientCompanies() {
  const {
    isPending: isLoadingClientCompanies,
    data: clientCompanies,
    isError,
  } = useQuery({
    queryKey: ['reports'],
    queryFn: () => Api.getClientCompany(),
  });

  return { isLoadingClientCompanies, clientCompanies, error: isError };
}
