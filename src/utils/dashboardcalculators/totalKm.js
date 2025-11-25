export default function calculateTotalKm(drivingData) {
  if (!drivingData || drivingData.length === 0) {
    return 0;
  }

  const total = drivingData.reduce(
    (total, trip) => total + (trip.distance ?? 0),
    0
  );

  return Math.floor(total);
}
