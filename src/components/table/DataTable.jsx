import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CustomFooter from "./CustomFooter";
import React from "react";
import { Box } from "@mui/material";

export default function DataTable({
  columns,
  rows = [],
  rowId,
  skip,
  setSkip,
  take=15,
  setTake,
  initialRowCount,
  count = 15,
  disableColumnSelector = true,
  showFooter,
}) {
  return (
    <Box
      sx={{
        height: 300,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#ca9af6",
          color: "white",
          fontSize: "1rem",
        },
      }}
    >
      <DataGrid
        rowHeight={40}
        showCellVerticalBorder
        headerHeight={40}
        disableColumnMenu
        rows={rows}
        columns={columns}
        autoHeight={true}
        getRowId={rowId}
        components={{
          Footer: CustomFooter,
          Toolbar: GridToolbar,
        }}
        disableColumnSelector={disableColumnSelector}
        disableDensitySelector={true}
        disableColumnFilter={true}
        disableIgnoreModificationsIfProcessingProps={true}
        slotProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
          },
          footer: {
            count,
            take,
            setTake,
            skip,
            setSkip,
            initialRowCount,
            showFooter,
          },
        }}
      />
    </Box>
  );
}
