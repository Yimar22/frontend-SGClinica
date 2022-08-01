import { USER_POLLS_PER_PAGE } from "./constants";

const API_URL = "http://localhost:8080";

export const REGISTER_ENDPOINT = API_URL + "/users";
export const LOGIN_ENDPOINT = API_URL + "/users/login";
export const CREATE_POLL_ENDPOINT = API_URL + "/polls";

//ENDPOINT para retornar una poll con sus preguntas, para eso se pasa el id de la poll
export const GET_POLL_WITH_QUESTIONS_ENDPOINT = (uuid:string)=>{
    return `${API_URL}/polls/${uuid}/questions`;
};

//Endpoint para enviar una reply al back 
export const CREATE_POLL_REPLY_ENDPOINT = API_URL + "/polls/reply";

//Endpoint para llamar a todas las encuestas de un user
export const GET_USER_POLLS_ENDPOINT = (page:number)=>`${API_URL}/polls?page=${page}&limit=${USER_POLLS_PER_PAGE}`;

export const TOGGLE_POLL_OPENED_ENDPOINT= (uuid:string)=>{
    return `${API_URL}/polls/${uuid}`;
};

export const DELETE_POLL_ENDPOINT= (uuid:string)=>{
    return `${API_URL}/polls/${uuid}`};