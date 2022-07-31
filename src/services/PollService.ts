import axios from "axios"
import {PollReply} from "../types";
import { CREATE_POLL_ENDPOINT, CREATE_POLL_REPLY_ENDPOINT, GET_POLL_WITH_QUESTIONS_ENDPOINT } from "../utils/endpoints"

export const savePoll = (data: any)=>{
    return axios.post(CREATE_POLL_ENDPOINT, data);
}

//ir al backend a traer la encuesta, se le pasa el id de la poll
export const getPollWithQuestions = (uuid:string) =>{
    return axios.get(GET_POLL_WITH_QUESTIONS_ENDPOINT(uuid));
}

//servicio para enviar el formulario con las respuestas al backend
export const createPollReply =(pollReply : PollReply)=>{
    //pasamos primero el endpoint y como segundo parametro los datos
    return axios.post(CREATE_POLL_REPLY_ENDPOINT, pollReply);
}