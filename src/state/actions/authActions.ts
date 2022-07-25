/*Los Actions son funciones que devuelven objetos planos.
Una acción debe tener una propiedad type que indica el tipo de acción a realizar.
Los tipos normalmente son definidos como strings constantes
*/


//en este archivo se definen las acciones para el user: loggearse y cerrar sesión

export type AuthActions = {type:'login', token: string} | {type:'logout'};