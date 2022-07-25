import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import User from "../Pages/User";
import { Route } from "../types";

//en este archivo se definen todas las rutas en un arreglo
const routes : Route[] =[
    //Ruta para el Home
    {
        path:"/",
        component: Home,
        routeType:"PUBLIC"
    },
    //Ruta para el Login
    {
        path:"/login",
        component: Login, 
        routeType:"GUEST"
    },
    //Ruta para el Register
    {
        path:"/register",
        component: Register, 
        routeType:"GUEST"
    },
    //Ruta para el User
    {
        path:"/user",
        component: User, 
        routeType:"PRIVATE"
    },
]

export default routes;