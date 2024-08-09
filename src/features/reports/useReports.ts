import { useQuery } from '@tanstack/react-query';
import Reports from '../../services/reports';

export function useReports() {
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['reports'],
    queryFn: () => Reports.getReports(),
    retry: 1,
  });

  return { isLoading, data, error: isError };
}
