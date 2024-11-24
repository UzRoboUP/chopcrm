import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Stocks from '../../services/stocks';
type CreateCommentProps = {
  comment: string;
  to_whom: string;
  by_whom: string;
};

export function useCreateStockComment() {
  const {
    mutate: createStockComment,
    isPending: isLoadingStockComment,
    isError: error,
  } = useMutation({
    mutationFn: ({ ...payload }: CreateCommentProps) =>
      Stocks.createComment({ ...payload }),
    onError: (err) => message.error(err.message),
  });
  return {
    createStockComment,
    isLoadingStockComment,
    error,
  };
}
