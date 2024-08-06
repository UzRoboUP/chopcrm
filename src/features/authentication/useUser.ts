import { useQuery } from '@tanstack/react-query';
import Profile from '../../services/profile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCredentials } from './authSlice';

export function useUser() {
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const {
    isPending: isLoadingUser,
    data: userData,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => Profile.getCurrentUser(userId as string),
    enabled: !!userId,
    retry: 1,
  });

  if (userData && !isLoadingUser) {
    dispatch(setCredentials(userData));
  }

  return { isLoadingUser, isFetching, userData, error: isError };
}
