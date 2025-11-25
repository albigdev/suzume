import styled from "styled-components";
import Filter from "./Filter";
import { useDrivingHistory } from "../features/drivinghistory/useDrivingHistory";
import { useDateConverter } from "../hooks/useDateConverter";
import { useSearchParams } from "react-router-dom";
import monthToNum from "../utils/monthToNum";
import { useLocation } from "react-router-dom";

const FilterMenuContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

function FilterMenu({ isDashboard: propIsDashboard = false }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isDashboard = propIsDashboard ?? location.pathname === "/dashboard";

  const { allDates } = useDrivingHistory(isDashboard);
  const { years, months, days } = useDateConverter(allDates);

  const monthOptions = months.map((month) => ({
    value: monthToNum(month),
    label: month,
  }));

  const yearsOptions = years.map((year) => ({
    value: year,
    label: year,
  }));

  const daysOptions = days.map((day) => ({
    value: day,
    label: day,
  }));

  function setYear(value) {
    if (value === "all") {
      searchParams.delete("year");
      searchParams.delete("month");
      searchParams.delete("pageSize");
      searchParams.delete("page");
    } else {
      searchParams.set("year", value);
    }
    setSearchParams(searchParams);
  }

  function setMonth(value) {
    if (value === "all") {
      searchParams.delete("month");
    } else {
      searchParams.set("month", value);
      searchParams.delete("pageSize");
      searchParams.delete("page");
    }
    setSearchParams(searchParams);
  }

  function setDay(value) {
    if (value === "all") {
      searchParams.delete("day");
    } else {
      searchParams.set("day", value);
      searchParams.delete("pageSize");
      searchParams.delete("page");
    }
    setSearchParams(searchParams);
  }

  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const day = searchParams.get("day");

  return (
    <FilterMenuContainer>
      <Filter
        options={yearsOptions}
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <Filter
        options={monthOptions}
        label="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        disabled={!year}
      />
      {isDashboard && (
        <Filter
          options={daysOptions}
          label="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          disabled={!month}
        />
      )}
    </FilterMenuContainer>
  );
}

export default FilterMenu;
