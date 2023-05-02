import Form from "react-bootstrap/Form";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { answerContent, removeAnswer } from "../../../slices/clinicHistory";
import { Circle, Square, Trash } from "react-bootstrap-icons";

const Answer = ({ questionIndex, answerIndex }) => {
  const dispatch = useDispatch();
  const clinicHistory = useSelector((state) => state.clinicHistory);

  const answer = clinicHistory.questions[questionIndex].answers[answerIndex];
  const question = clinicHistory.questions[questionIndex];

  const renderIcon = () => {
    switch (question.type) {
      case "SELECT":
        return <span className="me-1">{answerIndex + 1}</span>;
      case "RADIO":
        return <Circle className="me-1"></Circle>;
      case "CHECKBOX":
        return <Square className="me-1"></Square>;
      default:
        return;
    }
  };
  return (
    <>
      {/* si el tipo de la pregunta es string, no se renderiza nada */}
      <div className="d-flex align-items-center mb-2 answer-item">
        {renderIcon()}
        <Form.Control
          type="text"
          placeholder="Respuesta"
          value={answer.content}
          onChange={(e) => {
            dispatch(
              answerContent({
                answerIndex,
                index: questionIndex,
                content: e.target.value,
              })
            );
          }}
          disabled={question.type === "STRING" ? true : false}
        ></Form.Control>
        <span data-tip="Eliminar opción">
          <Trash
            className="ms-1 delete-answer"
            onClick={() => {
              dispatch(
                removeAnswer({ index: questionIndex, answerId: answer.id })
              );
            }}
          ></Trash>
        </span>
      </div>
    </>
  );
};

export default Answer;
