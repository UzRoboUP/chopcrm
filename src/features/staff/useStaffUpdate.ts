import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Profile from '../../services/profile';

export function useStaffUpdate() {
  const {
    mutate: updateStaff,
    isPending: isLoadingUpdate,
    isError: error,
  } = useMutation({
    mutationFn: ({ ...payload }) => Profile.updateStaff({ ...payload }),
    onError: (err) => message.error(err.message),
  });
  return {
    updateStaff,
    isLoadingUpdate,
    error,
  };
}
