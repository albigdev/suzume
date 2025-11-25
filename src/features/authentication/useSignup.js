import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success("Account successfully created!", { duration: 6000 });
    },
    onError: (error) => {
      toast.error(`Signup failed: ${error.message}`);
    },
  });

  return { signup, isLoading };
}
