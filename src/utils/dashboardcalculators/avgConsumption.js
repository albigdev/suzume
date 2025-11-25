export default function calcAvgConsumption(drivingData) {
  const valid = (drivingData || []).filter(
    (data) => Number(data.distance) > 0 && typeof data.totalFuel === "number"
  );
  if (valid.length === 0) return "—";
  const totalFuel = valid.reduce((acc, cur) => acc + Number(cur.totalFuel), 0);
  const totalDistance = valid.reduce(
    (acc, cur) => acc + Number(cur.distance),
    0
  );
  if (totalDistance === 0) return "—";
  const avg = (totalFuel / totalDistance) * 100; // L/100km
  return `${avg.toFixed(2)} L`;
}
