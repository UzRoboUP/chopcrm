import { useQuery } from '@tanstack/react-query';
import Company from '../../services/company';
import { useParams } from 'react-router-dom';

export function useCompanyEmployees() {
  const params = useParams();

  const AllParams = {
    company: params.id,
  };

  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: () => Company.getCompanyEmployees(AllParams),
    retry: 1,
  });

  return { isLoading, data, error: isError };
}
