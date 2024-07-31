import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginParams } from '../../models';
import Profile from '../../services/profile';
import { useAppDispatch } from '../../store/hooks';
import { setToken } from './authSlice';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ ...payload }: LoginParams) => Profile.login({ ...payload }),
    onSuccess: (data) => {
      const token = data?.access;
      queryClient.invalidateQueries({ queryKey: ['user'] });
      if (token) {
        console.log('token', token);
        dispatch(setToken(token));
        navigate('/analytics', { replace: true });
      }
    },
    onError: (err) => {
      console.log('ERROR', err);
      message.error('Provided username or password are incorrect');
    },
  });

  return {
    login,
    isLoading,
  };
}
