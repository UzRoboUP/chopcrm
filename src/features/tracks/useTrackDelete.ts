import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Tracks from '../../services/tracks';

export function useTrackDelete() {
  const {
    mutate: deleteTrack,
    isPending: isLoadingDelete,
    isError: error,
  } = useMutation({
    mutationFn: (id: string) => Tracks.deleteTrack(id),
    onError: (err) => message.error(err.message),
  });

  return {
    deleteTrack,
    isLoadingDelete,
    error,
  };
}
