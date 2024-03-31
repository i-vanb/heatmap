import React from "react";
import { Box } from "@mui/material";
import { HotTable } from '@handsontable/react';
import chroma from 'chroma-js';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from "handsontable";

registerAllModules();

export const HandsontableWidget = ({data, min, max}: HandsontableWidgetProps) => {
  const colorScale = chroma.scale(['#FFFFFF', '#f14343']).mode('lch');

  return (
    <Box>
      <HotTable
        data={data}
        rowHeaders={true}
        colHeaders={true}
        height="auto"
        licenseKey="non-commercial-and-evaluation"
        cells={(row, col, prop) => {
          const cellProperties: Partial<Handsontable.CellProperties> = {};
          if (typeof data[row][col] === 'number') {
            const normalizedValue = (data[row][col] as number - min) / (max - min);

            const color = colorScale(normalizedValue).hex();
            cellProperties.renderer = function (instance: Handsontable, td: HTMLTableCellElement, row: number, col: number): void {
              td.style.backgroundColor = color;
              td.textContent = data[row][col].toString();
            };
          }
          return cellProperties;
        }}
      />
    </Box>
  );
};

export type HandsontableWidgetProps = {
  data: (string|number)[][],
  min: number,
  max: number
}