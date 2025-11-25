export default function costPerKm(drivingData) {
  const valid = (drivingData || []).filter(
    (data) =>
      Number(data.distance) > 0 &&
      typeof data.cost === "number" &&
      data.cost > 0
  );
  if (valid.length === 0) return "—";
  const totalCost = valid.reduce((acc, cur) => acc + Number(cur.cost), 0);
  const totalDistance = valid.reduce(
    (acc, cur) => acc + Number(cur.distance),
    0
  );
  if (totalDistance === 0) return "—";
  const avg = totalCost / totalDistance; // Cost per km
  return `${avg.toFixed(2)} ft`;
}
