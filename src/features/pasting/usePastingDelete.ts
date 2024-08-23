import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Pasting from '../../services/pasting';

export function usePastingDelete() {
  const {
    mutate: deletePasting,
    isPending: isLoadingDelete,
    isError: error,
  } = useMutation({
    mutationFn: (id: string) => Pasting.deletePasting(id),
    onError: (err) => message.error(err.message),
  });

  return {
    deletePasting,
    isLoadingDelete,
    error,
  };
}
