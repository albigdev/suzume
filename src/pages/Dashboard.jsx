import Row from "../ui/Row";
import { useLocation } from "react-router-dom";
import Heading from "../ui/Heading";
import FilterMenu from "../ui/FilterMenu";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      <Row type="horizontal">
        <Heading>Dashboard</Heading>
        <FilterMenu isDashboard={isDashboard} />
      </Row>

      <DashboardLayout isDashboard={isDashboard} />
    </>
  );
}

export default Dashboard;
