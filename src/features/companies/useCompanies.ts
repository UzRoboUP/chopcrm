import { useQuery } from '@tanstack/react-query';
import Company from '../../services/company';
import { useSearchParams } from 'react-router-dom';

export function useCompanies() {
  const [params] = useSearchParams();
  const url = new URLSearchParams(params.toString());
  const company_status = params.get('company_status') || '';
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['companies',company_status],
    queryFn: () => Company.getCompany(url),
    retry: 1,
  });

  return { isLoading, data, error: isError };
}
