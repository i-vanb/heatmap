import {useMemo, useRef} from "react";
import {useHeatmapContext} from "../../context";
import {HandsontableWidget, HandsontableWidgetProps} from "./HandsontableWidget";

export const HandsontableWidgetContainer = () => {
  const {currentData, currentName} = useHeatmapContext();
  const cache = useRef<Record<string, HandsontableWidgetProps>>({});

  const {data, min, max} = useMemo(():HandsontableWidgetProps => {
    if (cache.current[currentName]) return cache.current[currentName];
    const data = [currentData.tableHeaders, ...currentData.tableData]

    const nextData = {
      data,
      ...getMinMax(data)
    }
    cache.current[currentName] = nextData;
    return nextData;
  }, [currentName])

  return (
    <div>
      <HandsontableWidget data={data} min={min} max={max}  />
    </div>
  );
}

const getMinMax = (data: (string|number)[][]):Pick<HandsontableWidgetProps, 'min' | 'max'> => {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  data.forEach(row => {
    row.forEach(value => {
      if (typeof value === 'string') return;

      if (value < min) min = Number(value);
      if (value > max) max = Number(value);
    })
  })
  return ({min, max});
}