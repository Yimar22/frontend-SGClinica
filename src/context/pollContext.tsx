//CONTEXTO DE POLL PARA QUE SEA UTILIZADO POR EL POLLREDUCER

import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from "react";
import { PollActions } from "../state/actions/pollActions";
import { pollInitialState, PollReducer } from "../state/reducers/pollReducer";
import { Poll } from "../types";

// 1.Crear el contexto para el State y el dispatch
export const PollStateContext = createContext<Poll>(pollInitialState);
export const PollDispatchContext = createContext<Dispatch<PollActions>>(()=>undefined);

//crear el provider como componente funcional (fc)
interface PollProviderProps{
    children: ReactNode
}
export const PollProvider:FC<PollProviderProps> = ({children})=>{
    //definimos el reducer para el provider
    const [poll, dispatch] = useReducer(PollReducer, pollInitialState);

    //retornamos el state y el dispach
    return (
        //estado es el poll
        <PollStateContext.Provider value ={poll}> 
            <PollDispatchContext.Provider value={dispatch}>
                {children}
            </PollDispatchContext.Provider>

        </PollStateContext.Provider>
    )
}

//hooks para utilizar
export const usePollState = ()=>{
    const context = useContext(PollStateContext);

    if(context === undefined){ 
        throw new Error("usePollState must be used within a PollProvider");
    }
    return context;
}

export const usePollDispatch = ()=>{
    const context = useContext(PollDispatchContext);

    if(context === undefined){ //es porque se esta utilizando el hook por fuera de un authprovider
        throw new Error("usePollDispatch must be used within an PollProvider");
    }
    return context;
}