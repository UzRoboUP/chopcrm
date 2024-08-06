/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useAppSelector } from '../store/hooks';
import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ProtectedRouteProps = {
  roles: string[];
};

function ProtectedRoute({
  children,
  roles,
}: PropsWithChildren<ProtectedRouteProps>) {
  const { isLoadingUser, isFetching, userData } = useUser();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  console.log({
    isAuthenticated,
    userData,
    isLoadingUser,
  });

  useEffect(() => {
    if (!userData && !isAuthenticated && !isFetching) {
      return navigate('/login');
    }
  }, [userData, navigate, isAuthenticated, isFetching]);

  if (isLoadingUser) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return children;
}

export default ProtectedRoute;
