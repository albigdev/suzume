import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DrivingTable from "../features/drivinghistory/DrivingTable";
import FilterMenu from "../ui/FilterMenu";
import DrivingMenu from "../features/drivinghistory/DrivingMenu";

function Drivinghistory() {
  return (
    <>
      <Row type="horizontal">
        <Heading>Driving History</Heading>
        <FilterMenu />
      </Row>
      <DrivingMenu />
      <DrivingTable />
    </>
  );
}

export default Drivinghistory;
