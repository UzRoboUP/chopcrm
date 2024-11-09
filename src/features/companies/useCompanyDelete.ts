import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Company from '../../services/company';

export function useCompanyDelete() {
  const {
    mutate: deleteCompany,
    isPending: isLoadingDelete,
    isError: error,
  } = useMutation({
    mutationFn: (id: string) => Company.deleteCompany(id),
    onError: (err) => message.error(err.message),
  });

  return {
    deleteCompany,
    isLoadingDelete,
    error,
  };
}
