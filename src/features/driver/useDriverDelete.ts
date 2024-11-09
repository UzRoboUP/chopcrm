import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Driver from '../../services/driver';

export function useDriverDelete() {
  const {
    mutate: deleteDriver,
    isPending: isLoadingDelete,
    isError: error,
  } = useMutation({
    mutationFn: (id: string) => Driver.deleteDriver(id),
    onError: (err) => message.error(err.message),
  });

  return {
    deleteDriver,
    isLoadingDelete,
    error,
  };
}
