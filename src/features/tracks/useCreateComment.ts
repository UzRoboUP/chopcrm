import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Tracks from '../../services/tracks';
type CreateCommentProps = {
  comment: string;
  comment_purpose: string;
  to_whom: string;
  by_whom: string;
};

export function useCreateComment() {
  const {
    mutate: createComment,
    isPending: isLoading,
    isError: error,
  } = useMutation({
    mutationFn: ({ ...payload }: CreateCommentProps) =>
      Tracks.createComment({ ...payload }),
    onError: (err) => message.error(err.message),
  });
  return {
    createComment,
    isLoading,
    error,
  };
}
