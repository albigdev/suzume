import { useState } from "react";
import { createContext } from "react";
import {
  useUpdateCosts,
  useUpdateRoadType,
} from "../drivinghistory/useUpdates";
import { useDeleteDrivingHistory } from "../drivinghistory/useDeleteDrivingHistory";
import toast from "react-hot-toast";

const BulkEditorContext = createContext();

function BulkEditorProvider({ children }) {
  const [showBulkEditor, setShowBulkEditor] = useState(false);
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState("");
  const [roadType, setRoadType] = useState("City");
  const [selectedIds, setSelectedIds] = useState([]);

  const { updateCosts } = useUpdateCosts();
  const { updateRoadTypeAsync } = useUpdateRoadType();
  const { deletedDataAsync } = useDeleteDrivingHistory();

  function handleCheck(id, checked) {
    setSelectedIds((ids) =>
      checked ? [...ids, id] : ids.filter((i) => i !== id)
    );
  }

  async function handleApply(allDrivingRecords, type) {
    if (type === "fuelPrice") {
      const results = allDrivingRecords
        .filter((rec) => selectedIds.includes(Number(rec.id)))
        .map((rec) => ({
          id: rec.id,
          cost: Math.round(Number(rec.totalFuel) * Number(fuelPricePerLiter)),
        }));
      console.log("Calculated fuel costs:", results);

      try {
        await Promise.all(
          results.map(({ id, cost }) => updateCosts({ id, cost }))
        );
        toast.success("Fuel costs updated successfully for selected records");
      } catch (error) {
        console.error("Error updating fuel costs:", error);
        toast.error("Error updating fuel costs for some records");
      }
    }

    if (type === "roadType") {
      const results = allDrivingRecords
        .filter((rec) => selectedIds.includes(Number(rec.id)))
        .map((rec) => ({
          id: rec.id,
          roadType,
        }));
      console.log("Selected road types:", results);

      try {
        await Promise.all(
          results.map(({ id, roadType }) =>
            updateRoadTypeAsync({ id, roadType })
          )
        );
        toast.success("Road types updated successfully for selected records");
      } catch (error) {
        console.error("Error updating road types:", error);
        toast.error("Error updating road types for some records");
      }
    }

    if (type === "deleteSelected") {
      const results = allDrivingRecords
        .filter((rec) => selectedIds.includes(Number(rec.id)))
        .map((rec) => ({
          id: rec.id,
        }));

      try {
        await Promise.all(results.map(({ id }) => deletedDataAsync(id)));
        toast.success("Selected driving data deleted successfully");
      } catch (error) {
        console.error("Error deleting selected driving data:", error);
        toast.error("Error deleting some selected driving data");
      }
    }
  }

  function resetBulkEditor() {
    setFuelPricePerLiter("");
    setSelectedIds([]);
    setRoadType("City");
  }

  return (
    <BulkEditorContext.Provider
      value={{
        showBulkEditor,
        setShowBulkEditor,
        fuelPricePerLiter,
        setFuelPricePerLiter,
        selectedIds,
        handleCheck,
        handleApply,
        resetBulkEditor,
        setSelectedIds,
        roadType,
        setRoadType,
      }}
    >
      {children}
    </BulkEditorContext.Provider>
  );
}

export { BulkEditorProvider, BulkEditorContext };
