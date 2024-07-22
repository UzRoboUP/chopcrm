import { useQuery } from '@tanstack/react-query';
import Profile from '../../services/profile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCredentials } from './authSlice';

export function useUser() {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const { isPending, data, isError } = useQuery({
    queryKey: ['user'],
    // queryFn: () => Profile.getCurrentUser({ token }),
    queryFn: () => Profile.getCurrentUserFake({ token }),
    enabled: !!token,
  });
  const user = data?.data?.user;
  if (user && !isPending) {
    dispatch(setCredentials(data));
  }

  return { isPending, user, error: isError };
}
