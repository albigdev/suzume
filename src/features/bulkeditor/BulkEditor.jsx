import Button from "../../ui/Button";
import styled from "styled-components";

const BulkEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: var(--color-grey-50);
  padding: 1.2rem 1.5rem;
  border-radius: 8px;
`;

const StyledLabel = styled.label`
  font-weight: 500;
`;

const StyledInput = styled.input`
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-50);
  border-radius: 4px;
  width: 120px;
  box-sizing: border-box;
  font-size: 1.6rem;
  align-self: stretch;
`;

const StyledSelect = styled.select`
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-50);
  border-radius: 4px;
  width: 160px;
  box-sizing: border-box;
  font-size: 1.6rem;
  align-self: stretch;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

function BulkEditor({
  fuelPricePerLiter,
  setFuelPricePerLiter,
  onApply,
  roadType,
  setRoadType,
}) {
  return (
    <>
      <BulkEditorWrapper>
        <StyledContainer>
          <StyledLabel>Fuel Price per Liter:</StyledLabel>
          <StyledInput
            type="number"
            placeholder="e.g., 500"
            value={fuelPricePerLiter}
            onChange={(e) => setFuelPricePerLiter(e.target.value)}
          />
          <Button variation="primary" onClick={() => onApply("fuelPrice")}>
            Apply
          </Button>
        </StyledContainer>

        <StyledContainer>
          <StyledLabel>Road Type:</StyledLabel>
          <StyledSelect
            value={roadType}
            onChange={(e) => setRoadType(e.target.value)}
          >
            <option value="City">City</option>
            <option value="Highway">Highway</option>
          </StyledSelect>

          <Button variation="primary" onClick={() => onApply("roadType")}>
            Apply
          </Button>
        </StyledContainer>
      </BulkEditorWrapper>
    </>
  );
}

export default BulkEditor;
