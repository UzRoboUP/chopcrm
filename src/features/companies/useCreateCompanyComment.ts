import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Company from '../../services/company';
type CreateCommentProps = {
  comment: string;
  comment_purpose: string;
  to_whom: string;
  by_whom: string;
};

export function useCreateCompanyComment() {
  const {
    mutate: createCompanyComment,
    isPending: isLoadingCompanyComment,
    isError: error,
  } = useMutation({
    mutationFn: ({ ...payload }: CreateCommentProps) =>
      Company.createComment({ ...payload }),
    onError: (err) => message.error(err.message),
  });
  return {
    createCompanyComment,
    isLoadingCompanyComment,
    error,
  };
}
