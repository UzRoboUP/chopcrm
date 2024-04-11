import { useQuery } from "@tanstack/react-query";
import { User, getCurrentUser } from "../../services/apiAuth";

type UseUserResult = {
  isLoading: boolean;
  user: User | undefined;
  isAuthenticated: boolean;
};

export function useUser(): UseUserResult {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.isAuth === true;

  return { isLoading, user, isAuthenticated };
}
