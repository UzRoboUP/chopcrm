import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Pasting from '../../services/pasting';

export function useArchivedUpdatePastingAll() {
  const queryClient = useQueryClient();

  const {
    mutate: updateArchivedPastingAll,
    isPending: isLoadingArchivedPastingUpdateAll,
  } = useMutation({
    mutationFn: (data: { is_archived: boolean; ids: string[] }) =>
      Pasting.updateArchivedPastingAll(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pastings'] });
      message.success('Pasting updated successfully');
    },
    onError: (err) => {
      console.log('ERROR', err);
      message.error('Something went wrong');
    },
  });

  return {
    updateArchivedPastingAll,
    isLoadingArchivedPastingUpdateAll,
  };
}
