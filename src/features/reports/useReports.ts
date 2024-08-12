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

  const reportsCount = data?.number_report_status;
  const reports = data?.reports;

  return { isLoading, reports, reportsCount, error: isError };
}
