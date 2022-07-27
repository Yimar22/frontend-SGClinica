//Componente para renderizar cada una de las preguntas que estén en Poll

import { FC, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { usePollDispatch, usePollState } from "../../context/pollContext";
import Answer from "./Answer";
import { PlusCircle, PlusLg, Trash } from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";
import { QUESTION_TYPE_OPTIONS } from "../../utils/constants";

interface QuestionProps{
    index:number
}

//definimos a Question como un componente funcional y le pasamos la interfaz con las propiedades
const Question:FC<QuestionProps>= ({index})=>{
    //1. obtener la pregunta que está haciendo representación a la pregunta dentro del state
    const poll = usePollState();
    const pollDispatch = usePollDispatch();
    const question = poll.questions[index];

    const errors: any = poll.errors;
    //como retorna el error el backend
    const errorKey = `questions[${index}]`;

    //método para renderizar las answer de la pregunta
    const renderAnswers = ()=>{
        return question.answers.map((answer, answerIndex)=>(
            <Answer 
            key={answer.id} 
            questionIndex={index}
            answerIndex={answerIndex}/>
            )
        )
    }

    useEffect(()=>{
        ReactTooltip.rebuild();
    } ,[question.answers.length]);
    return (

        <Card className="mt-3">
            <Card.Body>
                <Row>
                    <Col sm="12" md="6" className="mb-4">
                    <Form.Control
                    type="text"
                    placeholder="Pregunta"
                    value={question.content}
                    onChange={(e)=>pollDispatch({
                        type: "questioncontent",
                        payload: {
                            content: e.target.value,
                            index: index
                        }
                    })}
                    isInvalid={!!errors[`${errorKey}.content`]}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors[`${errorKey}.content`]}
                    </Form.Control.Feedback>
                        
                    </Col>
                    <Col sm="12" md="6" className="mb-4">
                    <Form.Control
                    as="select"
                    className="form-select"
                    value={question.type}
                    onChange={(e)=>{
                        pollDispatch({
                            type:"changequestiontype",
                            payload:
                            {
                                index: index,
                                value: e.target.value
                            }
                        })
                    }}
                    isInvalid={!!errors[`${errorKey}.type`]}
                    >
                        <option>Tipo de pregunta</option>
                        {
                            QUESTION_TYPE_OPTIONS.map((option)=>(
                                <option key={option.value} value={option.value}>{option.name}</option>
                                )
                            )
                        }
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors[`${errorKey}.type`]}
                    </Form.Control.Feedback>
                        
                    </Col>
                </Row>

                <Container>
                        {renderAnswers()}

                        <Button size="sm" className="mt-2" variant="outline-primary"
                        onClick={()=> pollDispatch({
                            type:"newanswer",
                            index:index
                        })}
                        >
                            <PlusLg/> Añadir respuesta
                        </Button>
                </Container>
                <hr/>

                <div className="d-flex justify-content-end">

                <span data-tip="Añadir pregunta" data-delay-hide='5000'>
                        <PlusCircle className="option-question-icon ms-1"
                            onClick={()=>{pollDispatch({
                                type: "newquestion",
                                index:index
                            })}}
                        >

                        </PlusCircle>
                    </span>
                    <span data-tip="Eliminar pregunta" data-delay-hide='5000'>
                        <Trash className="option-question-icon ms-1"
                            onClick={()=>{pollDispatch({
                                type: "removequestion",
                                questionId: question.id
                            })}}
                        >

                        </Trash>
                    </span>
                </div>

                <ReactTooltip place="left" effect="solid" delayHide={5000}/>
            </Card.Body>

        </Card>
    );
}
export default Question;