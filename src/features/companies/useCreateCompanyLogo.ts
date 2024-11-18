import Company from '../../services/company';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

export function useCreateCompanyLogo() {
  const queryClient = useQueryClient();

  const {
    data:urlLogo,
    mutate: createLogo,
    isPending: isLoadingLogo,
  } = useMutation({
    mutationFn: (data: FormData) => Company.createCompanyLogo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companyLogo'] });
      message.success("Success");
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return {
    createLogo,
    isLoadingLogo,
    urlLogo
  };
}
