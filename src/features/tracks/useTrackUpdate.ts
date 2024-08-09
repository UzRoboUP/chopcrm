import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Tracks from '../../services/tracks';

export function useTrackUpdate() {
  const {
    mutate: updateTrack,
    isPending: isLoadingUpdate,
    isError: error,
  } = useMutation({
    mutationFn: ({ ...payload }) => Tracks.updateTrack({ ...payload }),
    onError: (err) => message.error(err.message),
  });
  return {
    updateTrack,
    isLoadingUpdate,
    error,
  };
}
