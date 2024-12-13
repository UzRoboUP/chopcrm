import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Pasting from '../../services/pasting';

export function useUpdatePastingPhoto() {
  const queryClient = useQueryClient();

  const { mutate: updatePastingPhoto, isPending: isLoadingUpdatePastingPhoto } =
    useMutation({
      mutationFn: (data: { id: string; status_pasting: string }) =>
        Pasting.updatePastingPhoto(data),
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
    updatePastingPhoto,
    isLoadingUpdatePastingPhoto,
  };
}
