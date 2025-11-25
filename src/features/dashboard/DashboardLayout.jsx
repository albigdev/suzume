import styled from "styled-components";
import { useDrivingHistory } from "../drivinghistory/useDrivingHistory";
import Stats from "./Stats";
import Charts from "./Charts";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 2.4rem;
`;

function DashboardLayout({ isDashboard = true }) {
  const { drivingData, isLoading } = useDrivingHistory(isDashboard);

  return isLoading ? (
    <Spinner />
  ) : (
    <StyledDashboardLayout>
      <Stats drivingData={drivingData} />
      <Charts drivingData={drivingData} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
