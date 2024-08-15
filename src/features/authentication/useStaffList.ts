import { useQuery } from '@tanstack/react-query';
import Profile from '../../services/profile';
import { useSearchParams } from 'react-router-dom';

export function useStaffList(staff_status: string) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const {
    isPending: isLoading,
    data,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['staffList',search],
    queryFn: () => Profile.getStaffList(staff_status as string,search),
    enabled: !!staff_status,
    retry: 1,
  });

  return { isLoading, isFetching, data, error: isError };
}
