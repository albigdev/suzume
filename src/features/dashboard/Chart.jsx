import {
  PieChart,
  pieArcLabelClasses,
  pieArcClasses,
} from "@mui/x-charts/PieChart";
import "@emotion/styled";
import Heading from "../../ui/Heading";
import styled from "styled-components";

const ChartContainer = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: ${(props) =>
    props.position === "1" ? "1 / span 2" : "3 / span 2"};

  & > *:first-child {
    margin-bottom: 1.6rem;
  }
`;

function Chart({ position, title, data }) {
  if (title === "Road type") {
    const palette = ["#dc2626", "#2563eb", "#111827"];
    data = (data || []).map((d, i) => ({
      ...d,
      color: palette[i % palette.length],
    }));
  }

  return (
    <>
      <ChartContainer position={position}>
        <Heading as="h2">{title}</Heading>
        <PieChart
          series={[
            {
              data,
              arcLabel: (item) => `${item.value}`,
              innerRadius: 50,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "#ffffff",
              fontSize: 12,
              fontWeight: 600,
              pointerEvents: "none",
            },
            "& .MuiChartsLegend-root": {
              color: "var(--color-grey-700)",
              fontSize: "1.4rem",
              fontWeight: 400,
            },
            [`& .${pieArcClasses.root}`]: {
              stroke: "var(--color-grey-200)",
              strokeWidth: 1,
            },
          }}
          width={250}
          height={200}
        />
      </ChartContainer>
    </>
  );
}

export default Chart;
