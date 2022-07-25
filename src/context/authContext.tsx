import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from "react";
import { AuthActions } from "../state/actions/authActions";
import { authIntialState, AuthReducer } from "../state/reducers/authReducer";
import { User } from "../types";

export const AuthStateContext = createContext<User>(authIntialState);
export const AuthDispatchContext = createContext<Dispatch<AuthActions>>(()=>undefined);

//crear el provider como componente funcional (fc)
interface AuthProviderProps{
    children: ReactNode
}
export const AuthProvider:FC<AuthProviderProps> = ({children})=>{
    //definimos el reducer para el provider
    const [user, dispatch] = useReducer(AuthReducer, authIntialState);

    //retornamos el state y el dispach
    return (
        //estado es el user
        <AuthStateContext.Provider value ={user}> 
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>

        </AuthStateContext.Provider>
    )
}

//hooks para utilizar el authstate y otro para el authdispathc
export const useAuthState = ()=>{
    const context = useContext(AuthStateContext);

    if(context === undefined){ //es porque se esta utilizando el hook por fuera de un authprovider
        throw new Error("useAuthState must be used within an AuthProvider");
    }
    return context;
}

export const useAuthDispatch = ()=>{
    const context = useContext(AuthDispatchContext);

    if(context === undefined){ //es porque se esta utilizando el hook por fuera de un authprovider
        throw new Error("useAuthDispatch must be used within an AuthProvider");
    }
    return context;
}