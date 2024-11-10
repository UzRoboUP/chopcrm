import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Contract from '../../services/contract';

export function useContractUpdate() {
  const {
    mutate: updateContract,
    isPending: isLoadingUpdate,
    isError: error,
  } = useMutation({
    mutationFn: ({ ...payload }) => Contract.updateContract({ ...payload }),
    onError: (err) => message.error(err.message),
  });
  return {
    updateContract,
    isLoadingUpdate,
    error,
  };
}
