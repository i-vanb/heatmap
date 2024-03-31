import {HighchartsWidget} from "./HighchartsWidget";
import {useMemo, useRef} from "react";
import {useHeatmapContext} from "../../context";
import * as Highcharts from 'highcharts';

export const HighchartsWidgetContainer = () => {
  const {currentData, currentName} = useHeatmapContext();
  const cache = useRef<Record<string, Highcharts.Options>>({});

  const options = useMemo(() => {
    if (cache.current[currentName]) return cache.current[currentName];

    const categoriesX:Array<string> = [];
    const categoriesY:Array<string> = currentData.tableHeaders.slice(1);

    let min = 0;
    const seriesData = currentData.tableData.map((row, rowIndex) => {
      categoriesX.push(row[0].toString());
      return row.slice(1).map((value, colIndex) => {
        if (value < min) min = Number(value);

        return [rowIndex, colIndex, value];
      });
    }).flat() as Array<Highcharts.XrangePointOptionsObject>;

    const nextOptions = getOptions({categoriesX, categoriesY, min, seriesData});
    cache.current[currentName] = nextOptions;
    return nextOptions;
  }, [currentName])

  return (
    <div>
      <HighchartsWidget options={options} />
    </div>
  );
}

type getOptionsProps = {
  categoriesX: Array<string>,
  categoriesY: Array<string>,
  min: number,
  seriesData: Array<Highcharts.XrangePointOptionsObject>
}

const getOptions = (
  {categoriesX, categoriesY, min, seriesData}:getOptionsProps):Highcharts.Options => ({
  chart: {
    type: 'heatmap',
    marginTop: 40,
    marginBottom: 80,
    plotBorderWidth: 1
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: categoriesX,
  },
  yAxis: {
    categories: categoriesY,
    reversed: true,
    title: {
      text: ''
    }
  },
  accessibility: {
    point: {
      descriptionFormat: '{(add index 1)}. ' +
        '{series.xAxis.categories.(x)} ' +
        '{series.yAxis.categories.(y)}, {value}.'
    }
  },
  colorAxis: {
    min,
    minColor: '#FFFFFF',
    maxColor: '#f14343'
  },
  legend: {
    align: 'right',
    layout: 'vertical',
    margin: 0,
    verticalAlign: 'top',
    y: 25,
    symbolHeight: 280
  },
  tooltip: {
    format: '<b>{series.xAxis.categories.(point.x)}<br>' +
      '<b>{point.value}<br>' +
      '<b>{series.yAxis.categories.(point.y)}</b>'
  },
  series: [{
    name: 'Sales per employee',
    type: 'heatmap',
    borderWidth: 1,
    data: seriesData,
    dataLabels: {
      enabled: true,
      color: '#000000',
      formatter: function (this: Highcharts.PointLabelObject) {
        return this?.point?.value?.toFixed(2);
      }
    }
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        yAxis: {
          labels: {
            format: '{substr value 0 1}'
          }
        }
      }
    }]
  }
})