import React from "react";
import { Box } from "@mui/material";
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

registerAllModules();

export const HandsontableWidget = ({data}: HandsontableWidgetProps) => {

  return (
    <Box>
      <HotTable
        data={data}
        rowHeaders={true}
        colHeaders={true}
        height="auto"
        licenseKey="non-commercial-and-evaluation"
      />
    </Box>
  );
};

type HandsontableWidgetProps = {
  data: (string|number)[][]
}