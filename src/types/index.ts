export type User = {
    email: string,
    token: string,
    isAuthenticated: boolean
};

//TIPOS DE RUTA
export type RouteType =  "PRIVATE" | "PUBLIC" | "GUEST";

//Estructuración de cada una de las rutas de la aplicación
//cada ruta va a tener un path, un componente para renderizar y un tipo de ruta(privada, publica, guest)
export type Route = {
    path: string,
    component: any,
    routeType: RouteType
}