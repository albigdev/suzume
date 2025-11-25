import Table from "../../ui/Table";
import { useDeleteDrivingHistory } from "./useDeleteDrivingHistory";
import { useDrivingCities } from "./useLocation";
import { AiTwotoneDelete } from "react-icons/ai";
import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useUpdateRoadType } from "./useUpdates";
import useBulk from "../bulkeditor/useBulk";
import SpinnerMini from "../../ui/SpinnerMini";
//import { useUpdateTotalFuelConsumption } from "./useUpdates";

const ROAD_TYPES = ["City", "Highway"];

const StyledDeleteIcon = styled(AiTwotoneDelete)`
  color: var(--color-grey-600);
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--color-red-800);
  }
`;

const StyledDiv = styled.div`
  font-weight: 400;
  color: ${({ $active }) => ($active ? "var(--color-blue-800)" : "")};
  font-weight: ${({ $active }) => ($active ? "600" : "")};
`;

const StyledSelect = styled.select`
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  border: 1px solid var(--color-grey-200);
  background: var(--color-grey-0);
  color: ${({ $placeholder }) =>
    $placeholder ? "var(--color-grey-400)" : "var(--color-blue-800)"};
  font-size: 1rem;
  min-width: 7rem;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: var(--color-brand-600);
  }
`;

const StyledDeleteDiv = styled.div`
  margin-left: 2rem;
`;

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

function DrivingRow({ drivingData, sortBy }) {
  const {
    id,
    startCoords,
    endCoords,
    startDate,
    duration,
    distance,
    consumption,
    roadType,
    startCity,
    endCity,
    totalFuel,
    cost,
  } = drivingData;

  const { showBulkEditor, handleCheck, selectedIds } = useBulk();

  //This is for updating total fuel consumption when distance or consumption changes (disabled for now)
  //useUpdateTotalFuelConsumption({ id, consumption, distance, totalFuel });

  const { isLoadingStartLocation, isLoadingEndLocation } = useDrivingCities({
    id,
    startCoords,
    endCoords,
    startCityDb: startCity,
    endCityDb: endCity,
  });

  const { isDeleting, deletedData } = useDeleteDrivingHistory();

  const { updateRoadType } = useUpdateRoadType();

  function handleRoadTypeChange(e) {
    updateRoadType({ id, roadType: e.target.value });
  }

  return (
    <Modal>
      <Table.Row>
        {showBulkEditor && (
          <StyledDiv>
            <StyledCheckbox
              type="checkbox"
              checked={selectedIds.includes(drivingData.id)}
              onChange={(e) => handleCheck(drivingData.id, e.target.checked)}
              onClick={(e) => e.stopPropagation()}
            />
          </StyledDiv>
        )}
        <StyledDiv $active={sortBy === "startDate"}>{startDate}</StyledDiv>
        <StyledDiv $active={sortBy === "duration"}>{duration}</StyledDiv>
        <StyledDiv $active={sortBy === "totalFuel"}>{totalFuel} L</StyledDiv>
        <StyledDiv $active={sortBy === "distance"}>{distance} km</StyledDiv>
        <StyledDiv $active={sortBy === "consumption"}>
          {consumption} (L/100km)
        </StyledDiv>
        <StyledDiv $active={sortBy === "startCity"}>
          {/* {isLoadingStartLocation ? "Loading..." : startCity} */}
          {startCity === null && !isLoadingStartLocation && <SpinnerMini />}
          {startCity && startCity}
        </StyledDiv>
        <StyledDiv $active={sortBy === "endCity"}>
          {endCity === null && !isLoadingEndLocation && <SpinnerMini />}
          {endCity && endCity}
        </StyledDiv>
        <StyledDiv $active={sortBy === "cost"}>{cost} Ft</StyledDiv>
        <StyledSelect
          value={roadType || ""}
          onChange={handleRoadTypeChange}
          $placeholder={!roadType}
        >
          <option value="" disabled>
            Select type
          </option>
          {ROAD_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </StyledSelect>

        <StyledDeleteDiv>
          <Modal.Open opens="delete">
            <Button variation="tableButton" disabled={isDeleting}>
              <StyledDeleteIcon />
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              type="single"
              dateToDelete={startDate}
              disabled={isDeleting}
              onConfirm={() => {
                deletedData(drivingData.id);
              }}
            />
          </Modal.Window>
        </StyledDeleteDiv>
      </Table.Row>
    </Modal>
  );
}

export default DrivingRow;
