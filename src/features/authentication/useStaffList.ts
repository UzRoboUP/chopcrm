import { useQuery } from '@tanstack/react-query';
import Profile from '../../services/profile';

export function useStaffList(staff_status: string) {
  const {
    isPending: isLoading,
    data,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['staffList'],
    queryFn: () => Profile.getStaffList(staff_status as string),
    enabled: !!staff_status,
    retry: 1,
  });

  return { isLoading, isFetching, data, error: isError };
}
