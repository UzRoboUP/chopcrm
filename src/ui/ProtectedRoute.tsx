import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
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
  const { isPending, user, error } = useUser();
  const navigate = useNavigate();

  useEffect(
    () => {
      if ((!user && !isPending) || (error && roles && !roles.some(role => user?.roles.includes(role)))) {

        return navigate('/login');
      }
    },
    [user, roles, navigate, isPending, error]
  );


  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return children;
}

export default ProtectedRoute;
