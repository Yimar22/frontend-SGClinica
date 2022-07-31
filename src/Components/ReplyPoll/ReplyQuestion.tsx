//Componente funcional para renderizar cada una de las preguntas de la Poll

import { FC, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Question, UserAnswer } from "../../types";


//Interfaz para aceptar las propiedades que vamos a aceptar en el componente
interface ReplyQuestionProps{
    question:Question,
    //vamos a aceptar un callback para renderizar al padre(Poll) cada vez que un elemento de aquí cambie
    changeCallback: Function
}



const ReplyQuestion:FC<ReplyQuestionProps> = ({question, changeCallback})=>{

const [dato, setDato] = useState<any>({});
    //función para renderizar las respuestas
    const renderAnswers = ()=>{
        switch(question.type){
            case "RADIO":
            case "CHECKBOX":{
                return question.answers.map(answer=>{
                    return <div key={answer.id} className="mb-2">
                        <Form.Check
                            onChange={(e)=>{
                                    const data: UserAnswer={
                                    questionId : parseInt(question.id),
                                    answer: parseInt(e.target.value),
                                    type: question.type
                                }
                                changeCallback(data);
                            }}
                            value={answer.id}
                            type={question.type ==="RADIO" ? "radio" : "checkbox"}
                            name={question.id}
                            id={answer.id}
                            label={answer.content}
                        />
                    </div>
                })
            }
            case "CADENA":{
                return question.answers.map(answer=>{
                    return <div key={answer.id} className="mb-2">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Control
                             value={dato}
                             onChange={(e)=>{
                                const data:UserAnswer= {
                                    questionId : parseInt(question.id),
                                    answer: e.target.value,
                                    type: question.type
                                }
                                setDato(e.target.value);
                                changeCallback(data);
                                
                            }}
                            type="text"
                            placeholder="e.g Andrea"
                            ></Form.Control>
                         </Form.Group>

                    </div>
                })
            }
            case "SELECT":{
                return <div className="mb-2">
                    <FormControl
                        as="select"
                        onChange={(e)=>{
                            const data: UserAnswer = {
                                questionId : parseInt(question.id),
                                answer: parseInt(e.target.value),
                                type: question.type
                            }
                            changeCallback(data);
                        }}
                        className="form-select"
                        >
                            <option value="">Seleccione una opción</option>
                            {
                                question.answers.map(answer=>
                                    <option value={answer.id} key={answer.id}>{answer.content}</option>
                                    )
                            }
                        </FormControl>
                </div>
            }
        }
    }
    return (
        <div className="mb-4">
            <h6>{question.content}</h6>
            {renderAnswers()}
        </div>
    )
}
export default ReplyQuestion;