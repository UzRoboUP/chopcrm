import { useQuery } from '@tanstack/react-query';
import Tracks from '../../services/tracks';

export function useTrack(id: string) {
  const {
    isPending: isLoadingData,
    data: retrieveData,
    isError,
  } = useQuery({
    queryKey: ['track', id],
    queryFn: () => Tracks.getTrack(id),
    enabled: !!id,
  });

  return { isLoadingData, retrieveData, error: isError };
}
