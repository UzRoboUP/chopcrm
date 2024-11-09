import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Company from '../../services/company';

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  const { mutate: updateCompany, isPending: isLoadingUpdate } = useMutation({
    mutationFn: ({ ...payload }) => Company.updateCompany({ ...payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
    onError: (err) => {
      console.log('ERROR', err);
      message.error('Something went wrong');
    },
  });

  return {
    updateCompany,
    isLoadingUpdate,
  };
}

export function useUpdateCompanyStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateCompanySatus, isPending: isLoadingUpdateStatus } = useMutation({
    mutationFn: ({ ...payload }:{id:string,company_status:string}) => Company.updateCompanyStatus({ ...payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
    onError: (err) => {
      console.log('ERROR', err);
      message.error('Something went wrong');
    },
  });

  return {
    updateCompanySatus,
    isLoadingUpdateStatus,
  };
}

