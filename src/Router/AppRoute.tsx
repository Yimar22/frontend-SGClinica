import {Route, Redirect, RouteProps, RouteComponentProps} from "react-router-dom";
import { useAuthState } from "../context/authContext";
import { RouteType } from "../types";

interface AppRouteProps extends RouteProps{
    component:any,
    routeType: RouteType
}
const AppRoute=(props: AppRouteProps)=>{
    const { component: Component, path, routeType, ...rest} = props;

    const user = useAuthState();

    const renderComponent = (routeProps: RouteComponentProps) =>{
        switch (routeType){
            //rutas privadas
            case "PRIVATE":
                if(user.isAuthenticated){
                    return <Component {...routeProps}></Component>
                }else{
                    return <Redirect to="/"></Redirect>
                }
            //Rutas de invitados
            case "GUEST":
                //si el usuario no está autenticado
                if(!user.isAuthenticated){
                    return <Component {...routeProps}></Component>
                //cuando tiene autenticación se manda a la pantalla /user
                }else{
                    return <Redirect to="/user"></Redirect>
                }
            case "PUBLIC":
                return <Component {...routeProps}></Component>

        }
    }
    return (
        <Route {...rest} path={path} render={(routeProps)=>
            renderComponent(routeProps)}></Route>
    )
}

export default AppRoute;