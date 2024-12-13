import Company from '../../services/company';
import { useQuery } from '@tanstack/react-query';

export function useCompanyTarif(id: string) {
  const {
    isPending: isLoadingTarif,
    data: companyTarifData,
    isFetching: isFetchingTarif,
    isError,
  } = useQuery({
    queryKey: ['companyTarif', id],
    queryFn: () => Company.getCompanyTarif(id),
    retry: 1,
    enabled: !!id,
  });

  return { isLoadingTarif, isFetchingTarif, companyTarifData, error: isError };
}
