import { useQuery } from '@tanstack/react-query';
import Leads from '../../services/leads';
import { useSearchParams } from 'react-router-dom';

export function useLeads() {
  const [params] = useSearchParams();
  const url = new URLSearchParams(params.toString());
  const date = params.get('created_at__gt') || '';
  const search = params.get('search') || '';
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['leads',date,search],
    queryFn: () => Leads.getLeads(url),
  });

  return { isLoading, data, error: isError };
}
