import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Leads from '../../services/leads';
type CreateCommentProps = {
  comment: string;
  comment_purpose: string;
  to_whom: string;
  by_whom: string;
};

export function useCreateLeadComment() {
  const {
    mutate: createLeadComment,
    isPending: isLoadingLeadComment,
    isError: error,
  } = useMutation({
    mutationFn: ({ ...payload }: CreateCommentProps) =>
      Leads.createComment({ ...payload }),
    onError: (err) => message.error(err.message),
  });
  return {
    createLeadComment,
    isLoadingLeadComment,
    error,
  };
}
