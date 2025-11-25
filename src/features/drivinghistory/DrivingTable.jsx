import Table from "../../ui/Table";
import DrivingRow from "./DrivingRow";
import { useDrivingHistory } from "./useDrivingHistory";
import TableSortHeader from "../../ui/TableSortHeader";
import { useState } from "react";
import useBulk from "../bulkeditor/useBulk";
import styled from "styled-components";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../../ui/Spinner";

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 1.3rem;
  height: 1.3rem;
  accent-color: var(--color-blue-600);
  border-radius: 4px;
  border: 1.5px solid var(--color-grey-300);
  cursor: pointer;
  margin: 0;
  vertical-align: middle;
  transition: box-shadow 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px var(--color-blue-200);
    outline: none;
  }
`;

function DrivingTable() {
  const [sortBy, setSortBy] = useState("startDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

  const { showBulkEditor, selectedIds, setSelectedIds } = useBulk();
  const { drivingData, count, isLoading } = useDrivingHistory();

  //Selected logic
  const currentPageIds = (drivingData || []).map((data) => String(data.id));
  const allSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(Number(id)));

  function handleSort(key) {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  }

  useEffect(
    function () {
      const sortParam = `${sortBy}-${sortDirection}`;
      searchParams.set("sortBy", sortParam);
      setSearchParams(searchParams);
    },
    [sortBy, sortDirection, setSearchParams, searchParams]
  );

  //For Client-side sorting (not used anymore)
  // const sortedData = [...(drivingData || [])].sort((a, b) => {
  //   if (!a[sortBy] || !b[sortBy]) return 0;
  //   if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
  //   if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
  //   return 0;
  // });

  if (isLoading) return <Spinner />;

  return (
    <Table
      role="table"
      columns={`${
        showBulkEditor
          ? "0.1fr 0.6fr 0.7fr 0.8fr 0.7fr 0.7fr 0.5fr 0.5fr 0.4fr 0.6fr 0.5fr"
          : "0.6fr 0.7fr 0.8fr 0.7fr 0.7fr 0.5fr 0.5fr 0.4fr 0.6fr 0.5fr"
      }`}
    >
      <Table.Header>
        {showBulkEditor && (
          <div>
            <StyledCheckbox
              type="checkbox"
              checked={allSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedIds((prev) => {
                    const newIds = currentPageIds.map((id) => Number(id));
                    return [...prev, ...newIds];
                  });
                } else {
                  setSelectedIds((prev) => {
                    return prev.filter(
                      (id) => !currentPageIds.includes(String(id))
                    );
                  });
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <TableSortHeader
          sortKey="startDate"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Date
        </TableSortHeader>
        <TableSortHeader
          sortKey="duration"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Duration
        </TableSortHeader>
        <TableSortHeader
          sortKey="totalFuel"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Total Fuel
        </TableSortHeader>
        <TableSortHeader
          sortKey="distance"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Distance
        </TableSortHeader>
        <TableSortHeader
          sortKey="consumption"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Consumption
        </TableSortHeader>
        <TableSortHeader
          sortKey="startCity"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Start
        </TableSortHeader>
        <TableSortHeader
          sortKey="endCity"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          End
        </TableSortHeader>
        <TableSortHeader
          sortKey="cost"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Cost
        </TableSortHeader>
        <TableSortHeader
          sortKey="roadType"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Road type
        </TableSortHeader>
        <div>Actions</div>
      </Table.Header>
      <Table.Body
        data={drivingData}
        render={(entry) => (
          <DrivingRow drivingData={entry} key={entry.id} sortBy={sortBy} />
        )}
      ></Table.Body>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default DrivingTable;
