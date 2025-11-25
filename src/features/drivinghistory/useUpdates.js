import { updateDrivingData } from "../../services/apiDrivingData";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useUpdateCities() {
  const queryClient = useQueryClient();

  const { mutate: updateCitiesDB, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, startCity, endCity }) =>
      updateDrivingData(id, { startCity, endCity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivingData"] });
    },
    onError: () => {
      toast.error("Error updating cities");
    },
  });

  return { updateCitiesDB, isUpdating };
}

export function useUpdateRoadType() {
  const queryClient = useQueryClient();

  const {
    mutate,
    mutateAsync: updateRoadTypeAsync,
    isLoading: isUpdating,
  } = useMutation({
    mutationFn: ({ id, roadType }) => updateDrivingData(id, { roadType }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivingData"] });
    },
    onError: () => {
      toast.error("Error updating road type");
    },
  });

  function updateRoadType({ id, roadType }) {
    mutate(
      { id, roadType },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["drivingData"] });
          toast.success("Road type updated successfully");
        },
        onError: () => {
          toast.error("Error updating road type");
        },
      }
    );
  }

  return { updateRoadType, updateRoadTypeAsync, isUpdating };
}

export function useUpdateCosts() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateCosts, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, cost }) => updateDrivingData(id, { cost }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivingData"] });
    },
    onError: () => {
      toast.error("Error updating costs");
    },
  });

  return { updateCosts, isUpdating };
}

/* Update total fuel consumption based on distance and consumption rate (disabled)

It was used for testing purposes

export function useUpdateTotalFuelDB() {
  const queryClient = useQueryClient();

  const { mutate: updateTotalFuelDB, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, fuelUsed }) =>
      updateDrivingData(id, { totalFuel: fuelUsed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivingData"] });
    },
    onError: () => {
      toast.error("Error updating total fuel consumption");
    },
  });

  return { updateTotalFuelDB, isUpdating };
}

export function useUpdateTotalFuelConsumption({
  id,
  consumption,
  distance,
  totalFuel,
}) {
  const { updateTotalFuelDB } = useUpdateTotalFuelDB();
  const fuelUsed = (consumption / 100) * distance;

  useEffect(() => {
    if (
      typeof id !== "undefined" &&
      typeof totalFuel !== "undefined" &&
      totalFuel !== fuelUsed
    ) {
      updateTotalFuelDB({ id, fuelUsed: Number(fuelUsed.toFixed(2)) });
    }
  }, [id, fuelUsed, totalFuel, updateTotalFuelDB]);
}

 */
