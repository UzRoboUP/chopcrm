import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Contract from '../../services/contract';

export function useDeleteContract() {
  const {
    mutate: deleteContract,
    isPending: isLoadingDelete,
    isError: error,
  } = useMutation({
    mutationFn: (id: string) => Contract.deleteContract(id),
    onError: (err) => message.error(err.message),
  });

  return {
    deleteContract,
    isLoadingDelete,
    error,
  };
}
