function Dashboard() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const { drivingData } = useDrivingHistory(isDashboard);

  return (
    <>
      <Row type="horizontal">
        <Heading>Dashboard</Heading>
        <FilterMenu isDashboard={isDashboard} />
      </Row>
      <p>
        Total km: {drivingData?.reduce((acc, curr) => acc + curr.distance, 0)}{" "}
        km
      </p>
      <p>
        Average fuel consumption:{" "}
        {(() => {
          const valid = (drivingData || []).filter(
            (d) => Number(d.distance) > 0 && typeof d.totalFuel === "number"
          );
          if (valid.length === 0) return "—";
          const totalFuel = valid.reduce(
            (acc, cur) => acc + Number(cur.totalFuel),
            0
          );
          const totalDistance = valid.reduce(
            (acc, cur) => acc + Number(cur.distance),
            0
          );
          if (totalDistance === 0) return "—";
          const avg = (totalFuel / totalDistance) * 100; // L/100km
          return `${avg.toFixed(2)} L/100km`;
        })()}
      </p>
      Top 3 end city destinations:
      {(() => {
        const cityCounts = {};
        (drivingData || []).forEach((d) => {
          const city = d.endCity || "Unknown";
          cityCounts[city] = (cityCounts[city] || 0) + 1;
        });
        const sortedCities = Object.entries(cityCounts).sort(
          (a, b) => b[1] - a[1]
        );
        return sortedCities.slice(0, 3).map(([city, count]) => (
          <span key={city}>
            {city} ({count})
          </span>
        ));
      })()}
    </>
  );
}
