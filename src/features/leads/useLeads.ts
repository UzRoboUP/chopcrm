import { useQuery } from '@tanstack/react-query';
import Leads from '../../services/leads';

export function useLeads() {
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['leads'],
    queryFn: () => Leads.getLeads(),
  });

  return { isLoading, data, error: isError };
}
