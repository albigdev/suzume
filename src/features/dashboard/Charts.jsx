import Chart from "./Chart";
import pieCalc from "../../utils/dashboardcalculators/pieCalc";

function Charts({ drivingData }) {
  const roadTypesData = pieCalc(drivingData, "road");
  const destinationsData = pieCalc(drivingData, "city");

  return (
    <>
      <Chart position="1" title="Road type" data={roadTypesData} />
      <Chart
        position="2"
        title="Destinations (Top 5)"
        data={destinationsData}
      />
    </>
  );
}

export default Charts;
