import { User } from "../../types";
import { AuthActions } from "../actions/authActions";
import { authenticate, logout } from "../../utils/auth";
import produce from "immer";
//El reducer cambia la información del Store de manera global mediante las acciones
//cuando se cree el reducer, autenticamos al usuario con la función authenticate de auth.ts
export const authIntialState : User = authenticate();

export const AuthReducer = produce((state: User, action: AuthActions): User =>{
    
    switch(action.type){
        case "login":
            state = authenticate(action.token);
            return state;
        case "logout":
            state = logout();
            return state;
        default:

            return state;  
    }
});
