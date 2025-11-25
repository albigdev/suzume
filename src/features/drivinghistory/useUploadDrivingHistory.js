import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createBulkDrivingData } from "../../services/apiDrivingData";
import toast from "react-hot-toast";

export function useUploadDrivingHistory() {
  const queryClient = useQueryClient();

  const { isLoading: isUploading, mutate: uploadedData } = useMutation({
    mutationKey: ["uploadDrivingData"],
    mutationFn: createBulkDrivingData,
    onSuccess: () => {
      toast.success("Driving data uploaded");
      queryClient.invalidateQueries({ queryKey: ["drivingData"] });
    },
    onError: () => {
      toast.error("Driving data could not be uploaded");
    },
  });

  return { isUploading, uploadedData };
}
