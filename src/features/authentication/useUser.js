import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    isLoading,
    data: user,
    error: noUserError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
    noUserError,
  };
}
