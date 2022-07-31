import CreatePoll from "../Pages/CreatePoll";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ReplyPoll from "../Pages/ReplyPoll";
import User from "../Pages/User";
import { Route } from "../types";

//en este archivo se definen todas las rutas en un arreglo
const routes : Route[] =[
    //Ruta para el Home
    {
        path:"/",
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
    //Ruta para crear las polls
    {
        path:"/createpoll",
        component: CreatePoll, 
        routeType:"PRIVATE"
    },
    //ruta para responder poll
    {
        path:"/replypoll/:id", //lo que viene después de los : lo toma como parametro de la ruta
        component: ReplyPoll, 
        routeType:"PUBLIC"
    }
]

export default routes;