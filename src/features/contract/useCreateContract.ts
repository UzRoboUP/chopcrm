import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Contract from '../../services/contract';
import { companyDriverType } from '../../context/CompanyDriverContext';


export function useCreateContract() {
  const {
    mutate: createContract,
    isPending: isLoadingContractDriver,
    isError: error,
  } = useMutation({
    mutationFn: (payload: companyDriverType[]) =>
        Contract.createContract(payload),
    onError: (err) => message.error(err.message),
  });
  return {
    createContract,
    isLoadingContractDriver,
    error,
  };
}
