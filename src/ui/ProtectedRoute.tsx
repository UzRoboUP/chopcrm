import { PropsWithChildren, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from '../context/AuthContext';
import Spinner from "./Spinner";

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

function ProtectedRoute({ children, roles }: PropsWithChildren<ProtectedRouteProps>) {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (!user && !isLoading) {
        navigate('/login');
      }
    },
    [user]
  );

  if (user && roles && !roles.some(role => user.roles.includes(role))) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return children;

}

export default ProtectedRoute;
