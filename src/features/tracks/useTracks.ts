import { useQuery } from '@tanstack/react-query';
import Tracks from '../../services/tracks';

export function useTracks() {
  const { isPending, data, isError } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => Tracks.getTracks(),
  });

  console.log('tracks', data);

  return { isPending, data, error: isError };
}
