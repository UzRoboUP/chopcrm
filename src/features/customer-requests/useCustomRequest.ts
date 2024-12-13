import { useQuery } from '@tanstack/react-query';
import Reports from '../../services/reports';
import { useSearchParams } from 'react-router-dom';

export function useCustomRequest() {
  const [params] = useSearchParams();
  const url = new URLSearchParams(params.toString());
  const brand = params.get('car_brand') || '';
  const model = params.get('car_model') || '';
  const search = params.get('search') || '';
  const status_foto_report = params.get('status_foto_report') || '';
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['reports', brand, model, search, status_foto_report],
    queryFn: () => Reports.getReports(url),
    retry: 1,
  });

  const reportsCount = data?.number_report_status;
  const reports = data?.reports;

  return { isLoading, reports, reportsCount, error: isError };
}
