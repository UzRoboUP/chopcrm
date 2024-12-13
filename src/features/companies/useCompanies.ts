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
    isFetching:isFetchingCompany
  } = useQuery({
    queryKey: ['companies', company_status],
    queryFn: () => Company.getCompany(url),
    retry: 1,
  });
  const companies = data ? data?.client_company_list?.results : [];

  return { companies,isFetchingCompany, isLoading, data, error: isError };
}
