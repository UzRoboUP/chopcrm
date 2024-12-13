import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Pasting from '../../services/pasting';

export function useUpdatePasting() {
  const queryClient = useQueryClient();

  const { mutate: updatePasting, isPending: isLoadingUpdate } = useMutation({
    mutationFn: (data: { id: string; pasting_time: string }) =>
      Pasting.updatePasting(data),
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
    updatePasting,
    isLoadingUpdate,
  };
}
