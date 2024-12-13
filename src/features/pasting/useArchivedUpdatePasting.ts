import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Pasting from '../../services/pasting';

export function useArchivedUpdatePasting() {
  const queryClient = useQueryClient();

  const {
    mutate: updateArchivedPasting,
    isPending: isLoadingArchivedPastingUpdate,
  } = useMutation({
    mutationFn: ({ ...payload }: { is_archived: boolean; id: string }) =>
      Pasting.updateArchivedPasting({ ...payload }),
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
    updateArchivedPasting,
    isLoadingArchivedPastingUpdate,
  };
}
