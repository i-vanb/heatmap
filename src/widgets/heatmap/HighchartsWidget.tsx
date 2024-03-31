import React, {memo} from "react";
import { Box } from "@mui/material";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsHeatmap from 'highcharts/modules/heatmap';
HighchartsHeatmap(Highcharts);

type HighchartsWidgetProps = {
  options: Highcharts.Options
}

export const HighchartsWidget = memo(({options}:HighchartsWidgetProps) => {

  return (
    <Box>
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
    </Box>
  );
});