import {createContext, ReactNode, useContext, useState} from "react";
import {HeatmapProps} from "../widgets";
import {getData} from "../dataSources";

export const HeatmapContext = createContext<HeatmapContextType | null>(null);

export const HeatmapContextProvider = ({children}:HeatContextProviderProps) => {
    const data = getData();
    const [state, setState] = useState<HeatmapState>(getInitialState(data));

    const changeData = (name:string) => {
        const newData = data[name];
        if(newData) {
            setState(prevState=>{
                return {
                    ...prevState,
                    currentName: name,
                    currentData: newData
                }
            })
        }
    }

    return (
        <HeatmapContext.Provider value={{
            ...state,
            changeData
        }}>
            {children}
        </HeatmapContext.Provider>
    )
};

function getInitialState(data:Record<string, HeatmapProps>):HeatmapState {
    const names = Object.keys(data);
    const initialName = names[0];
    const initialData = data[initialName];

    return ({
        names,
        currentName: initialName,
        currentData: initialData
    })
}

export const useHeatmapContext = () => {
    const context = useContext(HeatmapContext);
    if (!context) {
        throw new Error("useHeatmapContext must be used within a HeatmapContext");
    }
    return context;
}

type HeatmapContextType = HeatmapState & {
    changeData: (name:string) => void;
}

type HeatmapState = {
    names: string[];
    currentName: string;
    currentData: HeatmapProps;
}

type HeatContextProviderProps = {
    children: ReactNode;
}