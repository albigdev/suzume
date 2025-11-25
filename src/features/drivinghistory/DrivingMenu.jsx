import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteDrivingHistory } from "../../features/drivinghistory/useDeleteDrivingHistory";
import useBulk from "../bulkeditor/useBulk";
import BulkEditor from "../bulkeditor/BulkEditor";
import { useDrivingHistory } from "../../features/drivinghistory/useDrivingHistory";
import UploadDrivingForm from "../../features/drivinghistory/UploadDrivingForm";
import { useSearchParams } from "react-router-dom";

function DrivingMenu() {
  const { isDeleting, deletedData } = useDeleteDrivingHistory();
  const { setSelectedIds } = useBulk();
  const [searchParams, setSearchParams] = useSearchParams();

  const { drivingData } = useDrivingHistory();

  const {
    showBulkEditor,
    setShowBulkEditor,
    resetBulkEditor,
    handleApply,
    setFuelPricePerLiter,
    roadType,
    setRoadType,
    selectedIds,
  } = useBulk();

  function handleShowBulkEditor() {
    setShowBulkEditor((prev) => !prev);
    resetBulkEditor();
  }

  return (
    <Modal>
      <Row>
        <div>
          <Row type="drivingMenu">
            <Modal.Open opens="upload">
              <Button variation="primary">Upload driving data (CSV)</Button>
            </Modal.Open>

            <Button variation="primary" onClick={handleShowBulkEditor}>
              {showBulkEditor ? "Close" : "Open"} Bulk Editor
            </Button>

            {selectedIds.length > 0 && (
              <Modal.Open opens="deleteSelected">
                <Button variation="danger">Delete selected</Button>
              </Modal.Open>
            )}

            {showBulkEditor && (
              <Modal.Open opens="deleteAll">
                <Button variation="danger">Delete all</Button>
              </Modal.Open>
            )}
          </Row>
          <Row>
            {showBulkEditor && (
              <BulkEditor
                onApply={(type) => handleApply(drivingData, type)}
                setFuelPricePerLiter={setFuelPricePerLiter}
                roadType={roadType}
                setRoadType={setRoadType}
              />
            )}
          </Row>
        </div>
        <Modal.Window name="upload">
          <UploadDrivingForm />
        </Modal.Window>

        <Modal.Window name="deleteSelected">
          <ConfirmDelete
            type="deleteSelected"
            disabled={isDeleting}
            onConfirm={() => handleApply(drivingData, "deleteSelected")}
          />
        </Modal.Window>

        <Modal.Window name="deleteAll">
          <ConfirmDelete
            type="all"
            disabled={isDeleting}
            onConfirm={() => {
              deletedData();
              searchParams.delete("page");
              setSearchParams(searchParams);
              setSelectedIds([]);
            }}
          />
        </Modal.Window>
      </Row>
    </Modal>
  );
}

export default DrivingMenu;
