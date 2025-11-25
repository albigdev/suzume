import Button from "../../ui/Button";
import { useUser } from "../../features/authentication/useUser";

import supabase from "../../services/supabase";
import Papa from "papaparse";
import { useUploadDrivingHistory } from "../drivinghistory/useUploadDrivingHistory";
import SpinnerMini from "../../ui/SpinnerMini";
import { useDeleteDrivingHistory } from "../../features/drivinghistory/useDeleteDrivingHistory";
import { useSearchParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function DemoUploader() {
  const { user } = useUser();
  const { isUploading, uploadedData } = useUploadDrivingHistory();
  const userId = user?.id;
  const { deletedData } = useDeleteDrivingHistory();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    deletedData();
    searchParams.delete("page");
    setSearchParams(searchParams);

    async function parseCsvFromStorage(bucket, path, onComplete) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);

      if (error) {
        throw error;
      }

      const csvText = await data.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          onComplete(results.data);
        },
        error: (err) => {
          console.error("CSV parse error:", err);
          throw err;
        },
      });
    }

    const parseNumberWithCommas = (str) => {
      if (typeof str !== "string") return null;
      const replaced = str.replace(/,/g, ".");
      const num = Number(replaced);
      return Number.isFinite(num) ? num : null;
    };

    parseCsvFromStorage("csv-bucket", "sampledata.csv", (rows) => {
      const finalData = rows.map((row) => {
        const distance = parseNumberWithCommas(row["Distance(km)"]);
        const consumption = parseNumberWithCommas(
          row["Fuel Consumption(L/100km)"]
        );
        return {
          startDate: row["Start Date"] || "1970-01-01",
          duration: row["Duration of Trip"] || null,
          endOdo: row["End ODO(km)"] ? Number(row["End ODO(km)"]) : null,
          distance,
          consumption,
          startCoords: row["Start Lat/Lon"] || null,
          endCoords: row["End Lat/Lon"] || null,
          totalFuel:
            distance && consumption
              ? Number(((distance / 100) * consumption).toFixed(2))
              : 0,
          cost: 0,
          user_id: user.id,
        };
      });

      uploadedData(finalData);
    });
  }

  async function handleDownload() {
    try {
      const { data, error } = await supabase.storage
        .from("csv-bucket")
        .download("sampledata.csv");

      console.log("Blob response:", { data });

      if (error) {
        console.error("Download error:", error);
        return;
      }

      // data: Blob
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sampledata.csv"; // Letölthető fájlnév
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  }

  if (userId != "74d57fea-dfc0-4a97-bf5c-1a194558a762") return null;

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "var(--color-grey-50)",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Modal>
        <Modal.Open opens="resetDemo">
          <Button disabled={isUploading}>
            {isUploading ? <SpinnerMini /> : "Reset Demo"}
          </Button>
        </Modal.Open>

        <Modal.Window name="resetDemo">
          <ConfirmDelete
            type="resetDemo"
            disabled={isUploading}
            onConfirm={() => {
              handleClick();
            }}
          />
        </Modal.Window>
      </Modal>

      <Button onClick={handleDownload}>Download CSV</Button>
    </div>
  );
}

export default DemoUploader;
