//En este archivo se va a crear la lógica para el login y el logout

import axios from "axios";
import { User } from "../types";
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = "token";
const defaultUser: User = {email: "",
    isAuthenticated: false,
    token: ""};
const setToken = (token: string)=>{
    localStorage.setItem(TOKEN_KEY, token);
}
const getToken = ()=>{
    return localStorage.getItem(TOKEN_KEY) || null; //en caso de que no exista el token en el LocalStorage que retorne null
}

const removeToken = ()=>{
    localStorage.removeItem(TOKEN_KEY);
}

export const authenticate =(token?:string) : User=>{
    //1. setear el token en el localStorage si lo estamos pasando
    if(token){
        setToken(token);
    }
    /*2. variable local _token
    Si se pasó el token por paramétro entonces va a ser ese token
    Si no, vamos al localStorage a traer el token con la función getToken()
    */
    const _token= token ? token : getToken();

    /*3. Decodificar el token
    Si no existe un token, retornamos el usuario por defecto: no hubo autenticación
    */
    if(!_token){
        return {...defaultUser}
    }
    /* En caso de que exista el token lo decodificamos para comprobar que este sea válido */
    const decoded : any = jwt_decode(_token);
    /* Calculamos el tiempo actual */
    const currentTime = Date.now() / 1000;

    /* exp es la propiedad del token que indica el tiempo en el que se va a expirar el token en segundos */
    if(decoded.exp < currentTime){ //el token se ha vencido
        removeToken();
        return{...defaultUser};
    }
    /** si el token no se ha vencido, el token es válido */
    /** Seteamos el authorization header de axios con el token válido */
    axios.defaults.headers.common["Authorization"] = _token;
    /*retornamos el defaultUser
    sobrescribiendo el email con el subject del token
    sobrescribiendo isAuthenticated a true
    sobrescribiendo el token válido
    */
    return {...defaultUser, email: decoded.sub, isAuthenticated:true, token:_token};
}

export const logout = (): User=>{
    removeToken();
    //eliminar token de axios
    delete axios.defaults.headers.common["Authorization"];
    return {...defaultUser};
}