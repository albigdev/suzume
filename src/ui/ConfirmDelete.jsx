import styled from "styled-components";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  dateToDelete,
  onConfirm,
  disabled,
  onCloseModal,
  type,
}) {
  return (
    <StyledConfirmDelete>
      <p>
        {type === "single"
          ? `Are you sure you want to delete this trip for ${dateToDelete}?`
          : type === "deleteSelected"
          ? `Are you sure you want to delete the selected trips from the list?`
          : type === "resetDemo"
          ? `Are you sure you want to reset the demo data? This will reload the sample data. You need to set up the costs and road types again. As we use free geolocation services, it may take some time to reprocess the start/end cities.`
          : `Are you sure you want to delete all trips from the list?`}
      </p>
      <div>
        <Button variation="primary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          variation="danger"
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
          disabled={disabled}
        >
          Confirm
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
