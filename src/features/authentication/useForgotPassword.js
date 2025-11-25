import { sendPasswordResetEmail as sendPasswordResetEmailApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useForgotPassword() {
  const { mutate: sendPasswordResetEmail, isLoading } = useMutation({
    mutationFn: (email) => sendPasswordResetEmailApi(email),
    onSuccess: () => {
      toast.success(
        "Password reset email sent successfully. Please check your inbox.",
        { duration: 6000 }
      );
    },
    onError: (err) => {
      console.error("Password reset failed:", err);
      toast.error("Failed to send password reset email.");
    },
  });

  return { sendPasswordResetEmail, isLoading };
}
