import { useQuery } from '@tanstack/react-query';
import Profile from '../../services/profile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCredentials } from './authSlice';

export function useUser() {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const { isPending, data: user } = useQuery({
    queryKey: ['user'],
    // queryFn: () => Profile.getCurrentUser({ token }),
    queryFn: () => Profile.getCurrentUserFake({ token }),
    enabled: !!token, // we need to wait for the auth that gives a token
  });
  const data = user?.data?.user;
  if (data && !isPending) {
    dispatch(setCredentials(data));
  }

  return { isPending, user };
}
