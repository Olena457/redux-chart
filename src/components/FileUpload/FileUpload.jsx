import { useDispatch } from "react-redux";
import { useRef } from "react";

import Papa from "papaparse";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import {
  setExperimentData,
  setLoading,
  setError,
} from "../../redux/experiment/experimentsSlice.js";

const FileUpload = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "text/csv") {
        toast.current.show({
          severity: "error",
          summary: "Download error",
          detail: "Please upload a CSV file.",
          life: 3000,
        });
        return;
      }

      dispatch(setLoading(true));
      dispatch(setError(null));

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (result) => {
          const requiredColumns = [
            "experiment_id",
            "metric_name",
            "step",
            "value",
          ];
          const missingColumns = requiredColumns.filter(
            (col) => !result.meta.fields.includes(col)
          );

          if (result.errors.length > 0 || missingColumns.length > 0) {
            const errorMsg =
              result.errors.length > 0
                ? "Failed to parse file. Check file structure."
                : `Required columns are missing: ${missingColumns.join(", ")}.`;

            dispatch(setError(errorMsg));
            toast.current.show({
              severity: "error",
              summary: "Parsing Error",
              detail: errorMsg,
              life: 5000,
            });
            dispatch(setLoading(false));
            return;
          }

          dispatch(setExperimentData(result.data));
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "File successfully uploaded and parsed!",
            life: 3000,
          });
          dispatch(setLoading(false));
        },
        error: (err) => {
          console.error("Error parsing CSV:", err.message);
          dispatch(setError(`Download error: ${err.message}`));
          toast.current.show({
            severity: "error",
            summary: "Download Error",
            detail: `Failed to download file: ${err.message}`,
            life: 5000,
          });
          dispatch(setLoading(false));
        },
      });
    }
  };

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Button
        label="Upload CSV file"
        icon="pi pi-upload"
        className="p-button-outlined p-button-success my-color-btn"
        onClick={() => document.getElementById("file-input").click()}
      />
      <input
        id="file-input"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default FileUpload;
