export default function pieCalc(drivingData = [], kind) {
  const originalKind = kind;
  if (kind === "road") kind = "roadType";
  if (kind === "city") kind = "endCity";
  const counts = drivingData.reduce((acc, trip) => {
    const type = trip[kind] || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  let entries = Object.entries(counts);
  if (originalKind === "city") {
    entries = entries.sort((a, b) => b[1] - a[1]);
  }

  const data = entries
    .map(([type, count], index) => ({
      id: index + 1,
      value: count,
      label: type,
    }))
    .slice(0, 5);

  return data;
}
