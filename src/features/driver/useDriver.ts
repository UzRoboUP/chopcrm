import { useQuery } from '@tanstack/react-query';
import Driver from '../../services/driver';

export function useDriver() {
  const {
    isPending: isLoadingData,
    data: drivers,
    isError,
  } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => Driver.getDrivers(),
  });

  return { isLoadingData, drivers, error: isError };
}
