import { useQuery } from '@tanstack/react-query';
import Company from '../../services/company';
import { useParams, useSearchParams } from 'react-router-dom';

export function useCompanyEmployees() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const tarif = searchParams.get('tarif') || '';

  const AllParams = {
    company: params.id,
    stock_task: params?.task_id,
    tarif,
  };

  const {
    isPending: isLoading,
    data: contractData,
    isError,
  } = useQuery({
    queryKey: ['employees',tarif],
    queryFn: () => Company.getCompanyEmployees(AllParams),
    retry: 1,
  });

  return { isLoading, contractData, error: isError };
}
