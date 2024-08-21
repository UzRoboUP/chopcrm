import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Pasting from '../../services/pasting';

export function usePastings() {
  const [params] = useSearchParams();
  const url = new URLSearchParams(params.toString());
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['pastings'],
    queryFn: () => Pasting.getPastings(url),
    retry: 1,
  });

  return { isLoading, data, error: isError };
}
