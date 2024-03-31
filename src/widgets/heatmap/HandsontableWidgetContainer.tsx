import {useMemo, useRef} from "react";
import {useHeatmapContext} from "../../context";
import {HandsontableWidget} from "./HandsontableWidget";

export const HandsontableWidgetContainer = () => {
  const {currentData, currentName} = useHeatmapContext();
  const cache = useRef<Record<string, dataType>>({});

  const data = useMemo(():dataType => {
    if (cache.current[currentName]) return cache.current[currentName];
    const nextData = [currentData.tableHeaders, ...currentData.tableData]
    cache.current[currentName] = nextData;
    return nextData;
  }, [currentName])

  return (
    <div>
      <HandsontableWidget data={data} />
    </div>
  );
}

type dataType = (string|number)[][]
