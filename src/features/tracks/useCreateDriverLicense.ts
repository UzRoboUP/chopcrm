import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Tracks from '../../services/tracks';


export function useCreateDriverLicense() {
  const {
    isPending: isLoading,
    isError: error,
    mutate: createLicense,
  } = useMutation({
    mutationFn: (data: {data:FormData}) =>
      Tracks.createDriverLicense(data),
    onError: (err) => message.error(err.message),
  });
  return {
    isLoading,
    error,
    createLicense,
  };
}
