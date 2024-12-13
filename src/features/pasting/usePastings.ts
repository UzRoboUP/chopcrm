import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Pasting from '../../services/pasting';

export function usePastings() {
  const [params] = useSearchParams();
  const url = new URLSearchParams(params.toString());
  const status_pasting = params.get('status_pasting') || '';
  const is_archived = params.get('is_archived') || '';
  
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['pastings',status_pasting,is_archived],
    queryFn: () => Pasting.getPastings(url),
    retry: 1,
  });

  return { isLoading, data, error: isError };
}
