import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import { questionTypeOptions } from "../../../utils/ClinicHistoryFormat";
import {
  questionContent,
  changeQuestionType,
  newAnswer,
  removeQuestion,
  newQuestion,
} from "../../../slices/clinicHistory";
import Answer from "./Answer";
import { PlusCircle, PlusLg, Trash } from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";
const Question = ({ index }) => {
  const dispatch = useDispatch();

  const clinicHistory = useSelector((state) => state.clinicHistory);
  const question = clinicHistory.questions[index];

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [question.answers.length]);

  const renderAnswers = () => {
    return question.answers.map((answer, answerIndex) => {
      return (
        <Answer
          key={answer.id}
          questionIndex={index}
          answerIndex={answerIndex}
        ></Answer>
      );
    });
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Row>
          <Col sm="12" md="6" className="mb-4">
            <Form.Control
              type="text"
              placeholder="Campo"
              value={question.content}
              onChange={(e) => {
                dispatch(
                  questionContent({ content: e.target.value, index: index })
                );
              }}
            />
          </Col>
          <Col sm="12" md="6" className="mb-4">
            <Form.Control
              as="select"
              value={question.type}
              className="form-select"
              onChange={(e) => {
                dispatch(
                  changeQuestionType({ index: index, value: e.target.value })
                );
              }}
            >
              <option hidden>Tipo de campo</option>
              {questionTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <Container>
          {renderAnswers()}
          <Button
            size="sm"
            className="mt-2"
            variant="outline-primary"
            onClick={() => dispatch(newAnswer({ index: index }))}
          >
            <PlusLg /> Agregar opción
          </Button>
        </Container>
        <hr />
        <div className="d-flex justify-content-end">
          <span data-tip="Añadir campo">
            <PlusCircle
              className="option-question-icon ms-1"
              onClick={() => {
                dispatch(newQuestion({ index: index }));
              }}
            ></PlusCircle>
          </span>
          <span data-tip="Eliminar campo">
            <Trash
              className="option-question-icon ms-1"
              onClick={() => {
                dispatch(removeQuestion({ questionId: question.id }));
              }}
            ></Trash>
          </span>
        </div>
        <ReactTooltip place="left" effect="solid" />
      </Card.Body>
    </Card>
  );
};

export default Question;
