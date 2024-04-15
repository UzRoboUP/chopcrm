import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LoginParams } from '../../models';
import Profile from '../../services/profile';
import { useAppDispatch } from '../../store/hooks';
import { setToken } from './authSlice';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginParams) =>
      // Profile.login({ email, password }),
      Profile.loginFake({ email, password }),
    onSuccess: ({ token }) => {
      // queryClient.setQueryData(['user'], token);
      navigate('/dashboard', { replace: true });
      dispatch(setToken({ token }));
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return {
    login,
    isPending,
  };
}
