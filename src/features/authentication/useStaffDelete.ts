import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Profile from '../../services/profile';

export function useStaffDelete() {
  const {
    mutate: deleteStaff,
    isPending: isLoadingDelete,
    isError: error,
  } = useMutation({
    mutationFn: (id: string) => Profile.deleteStaff(id),
    onError: (err) => message.error(err.message),
  });

  return {
    deleteStaff,
    isLoadingDelete,
    error,
  };
}
