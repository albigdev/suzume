import { updatePassword as updatePasswordAoi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function useUpdatePassword() {
  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: updatePasswordAoi,
    onSuccess: () => {
      toast.success("Password updated successfully!", { duration: 6000 });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updatePassword, isLoading };
}
