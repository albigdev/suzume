export default function totalFuelCost(drivingData) {
  const valid = (drivingData || []).filter(
    (data) => typeof data.cost === "number" && data.cost > 0
  );
  if (valid.length === 0) return "—";
  const totalCost = valid.reduce((acc, cur) => acc + Number(cur.cost), 0);
  return `${Math.floor(totalCost).toLocaleString("hu-HU")} ft`;
}
