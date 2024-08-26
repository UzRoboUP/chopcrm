import { useQuery } from '@tanstack/react-query';
import Company from '../../services/company';
import { useSearchParams } from 'react-router-dom';

export function useCompanies() {
  const [params] = useSearchParams();
  const url = new URLSearchParams(params.toString());
  const status_client_company = params.get('status_client_company') || '';
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['companies',status_client_company],
    queryFn: () => Company.getCompany(url),
    retry: 1,
  });

  return { isLoading, data, error: isError };
}
