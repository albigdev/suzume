import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Papa from "papaparse";
import { useUploadDrivingHistory } from "./useUploadDrivingHistory";
import { useUser } from "../../features/authentication/useUser";

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

function UploadDrivingForm({ onCloseModal }) {
  const { register, handleSubmit } = useForm();
  const { user } = useUser();

  const { isUploading, uploadedData } = useUploadDrivingHistory();

  function onSubmit(data) {
    const file = data.fileUpload[0];

    const parseNumberWithCommas = (str) => {
      if (typeof str !== "string") return null;
      const replaced = str.replace(/,/g, ".");
      const num = Number(replaced);
      return Number.isFinite(num) ? num : null;
    };

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;

        const finalData = rows.map((row) => {
          const distance = parseNumberWithCommas(row["Distance(km)"]);
          const consumption = parseNumberWithCommas(
            row["Fuel Consumption(L/100km)"]
          );

          return {
            startDate: row["Start Date"] || "1970-01-01",
            duration: row["Duration of Trip"] || null,
            endOdo: row["End ODO(km)"] ? Number(row["End ODO(km)"]) : null,
            distance: distance,
            consumption: consumption,
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
        onCloseModal();
      },
    });
  }

  return (
    <div>
      <Heading as="h2">Upload Driving History</Heading>
      <Form type="fileUpload" onSubmit={handleSubmit(onSubmit)}>
        <FormRow type="fileUpload" label="Upload CSV File">
          <FileInput
            id="fileUpload"
            accept="text/csv"
            {...register("fileUpload", { required: true })}
          />
        </FormRow>

        <FormRow type="fileUpload">
          <ButtonRow>
            <Button variation="danger" onClick={() => onCloseModal()}>
              Cancel
            </Button>
            <Button>Upload File</Button>
          </ButtonRow>
        </FormRow>
      </Form>
    </div>
  );
}

export default UploadDrivingForm;
