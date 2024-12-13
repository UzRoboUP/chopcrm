import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Reports from '../../services/reports';

export function useUpdateReportStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateReportStatus, isPending: isLoadingUpdateReportStatus } =
    useMutation({
      mutationFn: (data: { id: string; status_foto_report: string }) =>
        Reports.updateReportStatus(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reports'] });
        message.success('Report updated successfully');
      },
      onError: (err) => {
        console.log('ERROR', err);
        message.error('Something went wrong');
      },
    });

  return {
    updateReportStatus,
    isLoadingUpdateReportStatus,
  };
}
