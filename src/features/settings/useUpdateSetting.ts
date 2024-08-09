import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Profile from '../../services/profile';

export type UpdateSettingProps = {
  id: string;
  image: File;
  payload: object;
};

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending: isLoading } = useMutation({
    mutationFn: (formData) => Profile.updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      message.success('Profile updated successfully');
    },
    onError: (err) => {
      console.log('ERROR', err);
      message.error('Something went wrong');
    },
  });

  return {
    updateProfile,
    isLoading,
  };
}
