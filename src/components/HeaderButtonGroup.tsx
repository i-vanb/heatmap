import {useHeatmapContext} from "../context";
import {Button} from "@mui/material";
import React from "react";

export const HeaderButtonGroup = () => {
  const {names, currentName, changeData} = useHeatmapContext();

  return(
    <>
      {names.map(name => {
        const isCurrent = currentName === name;
        const variant = isCurrent ? "contained" : "text";
        const onClickHandler = () => changeData(name);
        return <Button key={name}
                       onClick={onClickHandler}
                       size="small"
                       variant={variant}
                       disabled={isCurrent}
                       sx={{marginLeft: "15px", padding: "4px 10px"}}
        >{name}</Button>
      })}
    </>
  )
}