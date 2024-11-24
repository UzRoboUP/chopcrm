import Company from '../../services/company';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

export function useCreateCompany() {
  const queryClient = useQueryClient();

  const {
    mutate: createCompany,
    isPending: isLoading,
  } = useMutation({
    mutationFn: (data: FormData) => Company.createCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      message.success("Success");
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return {
    createCompany,
    isLoading,
  };
}
