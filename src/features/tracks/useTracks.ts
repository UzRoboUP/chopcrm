import { useQuery } from '@tanstack/react-query';
import Tracks from '../../services/tracks';

export function useTracks() {
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => Tracks.getTracks(),
  });

  console.log('tracks', data);

  return { isLoading, data, error: isError };
}
