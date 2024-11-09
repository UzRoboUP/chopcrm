import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Contract from '../../services/contract';
type CreateContractProps = {
  company: string | undefined;
  driver: string;
  status_contract: string;
  contract_duration: number;
};

export function useCreateContract() {
  const {
    mutate: createContract,
    isPending: isLoadingContract,
    isError: error,
  } = useMutation({
    mutationFn: ({ ...payload }: CreateContractProps) =>
        Contract.createContract({ ...payload }),
    onError: (err) => message.error(err.message),
  });
  return {
    createContract,
    isLoadingContract,
    error,
  };
}
