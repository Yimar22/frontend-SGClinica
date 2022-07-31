import { FC, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import  Form from "react-bootstrap/Form";
import { createPollReply, getPollWithQuestions } from "../../services/PollService";
import { PollReplyDetail, Question, UserAnswer } from "../../types";
import ReplyQuestion from "./ReplyQuestion";
import Button from "react-bootstrap/Button";
import { Alert, Spinner } from "react-bootstrap";
import { Check2Circle } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

//Definimos una interfaz para poner las propiedades que le vamos a pasar al componente Poll
interface PollProps{
    id: string
}

const Poll:FC<PollProps> = ({id})=>{

    //creamos el estado para la Poll
    const[poll, setPoll] = useState<any>(null);

    //nombre del usuario
    const[user, setUser] = useState("");

    //objeto de errores de validación
    const[errors, setErrors] = useState<any>({});


    //objeto que va a contener todas las respuestas que se seleccionen en el formulario
    const[userAnswers, setUserAnswers] = useState<any>({});

    //pieza de estado para saber cuando el usuario ya respondió la encuesta
    const [isPollAnswered, setIsPollAnswered] = useState(false);

    //pieza de estado para hacer el botón de Enviar respuestas dinámico
    const[sendingData, setSendingData]= useState(false);

    //para mandar al usuario hacia la pagina principal
    const history= useHistory();

    //utilizamos el hook useEffect para hacer el llamado a la API mediante axios
    useEffect(()=>{
        fetchPoll();
    }, []);

    //Función que nos ayuda a traernos la encuesta
    const fetchPoll = async ()=>{
        try{
            const response :any = await getPollWithQuestions(id);
            const data = response.data;
            //ordenar las preguntas
            data.questions = data.questions.sort((a:Question, b:Question)=> a.questionOrder - b.questionOrder);
            setPoll(data);
            //console.log(poll); 
        }catch(error:any){
            if(error.response.status ===500){
                //mandamos al usuario hacia la pagina principal
                history.replace("/")
            }
            //console.error(error);
            //TODO redireccionar a página principal cuando la encuesta no existe
        }
    }

    //Función callback para mandar a ReplyQuestion
    const handleQuestionChange = (answer: UserAnswer)=>{
        const answers = {...userAnswers};
        
        switch(answer.type){
            case "RADIO":
            case "SELECT":{
                //como key es el questionId de la answer
                answers[answer.questionId] = {questionId : answer.questionId, answerId: answer.answer}
                break;
            }
            case "CHECKBOX":{
                if(answers[answer.questionId]){
                    const arr = answers[answer.questionId].answers;
                    const index = arr.indexOf(answer.answer);
                    if(index===-1){ //no existia en el arreglo
                        arr.push(answer.answer);
                    }else{
                        arr.length<2 ? delete answers[answer.questionId] : arr.splice(index,1);
                    }
                }else{
                    answers[answer.questionId] = {questionId:answer.questionId, answers: [answer.answer]}

                }
                break;
            }
            case "CADENA":{
                answers[answer.questionId] = {questionId : answer.questionId, answerId: answer.questionId, answerContent: answer.answer}
                break;
            }
        }
        //console.log(answers);
        setUserAnswers(answers);
    }

    //Función para renderizar las preguntas
    const renderQuestions = ()=>{
        /**Vamos a pasar como propiedad la question que estamos recorriendo  */
        return poll.questions.map((question:Question) => <ReplyQuestion
        changeCallback={handleQuestionChange}
        question = {question} key={question.id}
        ></ReplyQuestion>)
        
    }

    //Función para preparar el formulario y enviarlo al backend
    const prepareForm = async ()=>{
        //Reiniciar los errores
        setErrors({});
        //verificar si se respondieron todas las preguntas
        if(Object.keys(userAnswers).length !== poll.questions.length){
            setErrors((current : any )=>{
                return{...current, allQuestionsAnswered: "Por favor responda todas las preguntas"}
            });
            return;
        }
        //Formato que necesitamos enviar al backend
        let replies :PollReplyDetail[] = [];
        
        for(let key in userAnswers){
            if(userAnswers[key].answers){ //si userAnswer[key] tiene una key llamada answers eso quiere decir que es un checkbox ya que es un arreglo
                userAnswers[key].answers.forEach((id:number)=>replies.push({
                    questionId: userAnswers[key].questionId, answerId: id, answerContent:"null"
                }))
            }else{
                replies.push(userAnswers[key]);
            }
        }
        sendForm(replies)

        //console.log(replies); 
    
    }

    const sendForm = async(replies :PollReplyDetail[])=>{
        try{
            setSendingData(true);
            await createPollReply({
                pollReplies : replies,
                poll: poll.id,
                user: user
            });
            setSendingData(false);
            setIsPollAnswered(true);
        }catch(error: any){
            if(errors.response){
                errors.response.status===400 && setErrors(errors.response.data.errors);
            }
            setSendingData(false);


        }
    }
    return(
        <Container>
            <Row>
                <Col sm="10" md="10" lg="8" className="mx-auto mt-5 mb-5">

                    {
                        isPollAnswered &&
                        <div className="d-flex align-items-center flex-column poll-answered-container">
                            <Check2Circle className="success-icon"></Check2Circle>
                                <Alert show={isPollAnswered} variant="success">
                                    Muchas gracias por tu respuesta!
                                </Alert>
                            
                        </div>
                    }
                    {/** Preguntar si existe una encuesta */}
                    { 
                        poll && !isPollAnswered && <>
                        <h2>{poll.content}</h2>
                        <hr/>
                        <Form.Group className="mb-3" controlId="hola">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                value={user}
                                onChange={e=>setUser(e.target.value)}
                                type="text"
                                placeholder="e.g Andrea"
                                isInvalid={!!errors.user}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.user}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div>
                            {renderQuestions()}
                        </div>

                        

                        <Button type="submit" onClick={prepareForm}>
                                    {sendingData ? <>
                                        <Spinner
                                            animation="border"
                                            as="span"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        >    
                                        </Spinner>&nbsp;
                                        <span>Enviando respuestas...</span>
                                    </> : <>Responder encuesta</>}
                                </Button>

                        {
                            errors.allQuestionsAnswered && <Alert className="mt-4" variant="danger">
                                {errors.allQuestionsAnswered}
                            </Alert>
                        }
                        </>
                    }
                </Col>
            </Row>
            
        </Container>
    )
}

export default Poll;