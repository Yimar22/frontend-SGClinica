import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import Poll from "../Components/ReplyPoll/Poll";

//parametro que recibimos de la ruta
interface RouteParams {
    id: string; //id de la Poll
}

interface ReplyPollProps extends RouteComponentProps<RouteParams>{

}

//creamos un componente funcional ReplyPoll
const ReplyPoll:FC<ReplyPollProps> = (props)=>{
    const pollUUID = props.match.params.id; //extraemos el parametro de la ruta
    return (<Poll id={pollUUID}></Poll>)
}

export default ReplyPoll;