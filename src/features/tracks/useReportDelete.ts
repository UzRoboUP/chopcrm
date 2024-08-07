import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Reports from '../../services/reports';

export function useReportDelete() {
  const {
    mutate: deleteReport,
    isPending: isLoadingDelete,
    isError: error,
  } = useMutation({
    mutationFn: (id: string) => Reports.deleteReport(id),
    onError: (err) => message.error(err.message),
  });

  return {
    deleteReport,
    isLoadingDelete,
    error,
  };
}
