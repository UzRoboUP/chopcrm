import { useMutation, useQueryClient } from '@tanstack/react-query';
import Profile from '../../services/profile';
import { message } from 'antd';
import { StaffType } from './CreateStaffDataModal';

export function useCreateStaff() {
  const queryClient = useQueryClient();
  const {
    mutate: createStaff,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data:StaffType) => Profile.createStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffList'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { createStaff, isPending, error };
}
