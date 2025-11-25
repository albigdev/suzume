import { useMemo } from "react";
import totalkm from "../../utils/dashboardcalculators/totalKm";
import calcAvgConsumption from "../../utils/dashboardcalculators/avgconsumption";
import costPerKm from "../../utils/dashboardcalculators/costPerKm";
import totalFuelCost from "../../utils/dashboardcalculators/totalFuelCost";

export default function useDashboardStats(drivingData) {
  return useMemo(() => {
    const totalKm = totalkm(drivingData);
    const avgConsumption = calcAvgConsumption(drivingData);
    const costPerKM = costPerKm(drivingData);
    const totalCost = totalFuelCost(drivingData);
    return { totalKm, avgConsumption, costPerKM, totalCost };
  }, [drivingData]);
}
