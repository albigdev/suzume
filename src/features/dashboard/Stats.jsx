import Stat from "./Stat";
import { GiCarWheel } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import { GiPayMoney } from "react-icons/gi";
import totalkm from "../../utils/dashboardcalculators/totalKm";
import calcAvgConsumption from "../../utils/dashboardcalculators/avgConsumption";
import costPerKm from "../../utils/dashboardcalculators/costPerKm";
import totalFuelCost from "../../utils/dashboardcalculators/totalFuelCost";

function Stats({ drivingData }) {
  const totalKm = totalkm(drivingData);
  const avgConsumption = calcAvgConsumption(drivingData);
  const costPerKM = costPerKm(drivingData);
  const totalCost = totalFuelCost(drivingData);

  return (
    <>
      <Stat
        icon={<GiCarWheel />}
        title="Total km"
        value={totalKm}
        color="red"
      />
      <Stat
        icon={<BsFillFuelPumpFill />}
        title="Average consumption"
        value={avgConsumption}
        color="red"
      />
      <Stat
        icon={<GiPayMoney />}
        title="Cost / km"
        value={costPerKM}
        color="blue"
      />
      <Stat
        icon={<TbPigMoney />}
        title="Fuel cost"
        value={totalCost}
        color="blue"
      />
    </>
  );
}

export default Stats;
