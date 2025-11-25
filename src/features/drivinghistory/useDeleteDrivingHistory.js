import { deleteDrivingData } from "../../services/apiDrivingData";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useUser } from "../../features/authentication/useUser";

export function useDeleteDrivingHistory() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    isLoading: isDeleting,
    mutate,
    mutateAsync,
  } = useMutation({
    mutationKey: ["deleteDrivingData"],
    mutationFn: ({ id, userId }) => deleteDrivingData(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivingData"] });
    },
    onError: (error) => {
      console.error("Error deleting driving data:", error);
      toast.error(error.message);
    },
  });

  function deletedData(id) {
    mutate(
      { id, userId: user.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["drivingData"] });
          toast.success("Driving data deleted");
        },
        onError: (error) => {
          console.error("Error deleting driving data:", error);
          toast.error(error?.message || "Error deleting driving data");
        },
      }
    );
  }

  function deletedDataAsync(id) {
    return mutateAsync({ id, userId: user.id });
  }

  return { isDeleting, deletedData, deletedDataAsync };
}
