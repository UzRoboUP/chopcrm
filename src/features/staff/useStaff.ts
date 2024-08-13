import { useQuery } from '@tanstack/react-query';
import Profile from '../../services/profile';

export function useStaff(id: string) {
  const {
    isPending: isLoadingData,
    data: retrieveData,
    isError,
  } = useQuery({
    queryKey: ['staffGet', id],
    queryFn: () => Profile.getStaff(id),
    enabled: !!id,
  });

  return { isLoadingData, retrieveData, error: isError };
}
