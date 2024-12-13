import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Pasting from '../../services/pasting';

export function usePastingComment() {
  const queryClient = useQueryClient();

  const { mutate: commentPasting, isPending: isLoadingUpdate } = useMutation({
    mutationFn: (data: {
      id:string
      rate: number;
      comment: string;
      by_whom: string;
      to_whom: string;
    }) => Pasting.updatePastingComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pastings','reports'] });
      message.success('Pasting comment successfully');
    },
    onError: (err) => {
      console.log('ERROR', err);
      message.error('Something went wrong');
    },
  });

  return {
    commentPasting,
    isLoadingUpdate,
  };
}
