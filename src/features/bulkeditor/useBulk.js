import { useContext } from "react";
import { BulkEditorContext } from "./BulkEditorContext";

function useBulk() {
  const context = useContext(BulkEditorContext);
  if (!context) {
    throw new Error("useBulk must be used within a BulkEditorProvider");
  }
  return context;
}

export default useBulk;
