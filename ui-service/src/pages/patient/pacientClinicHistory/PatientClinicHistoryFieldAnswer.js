import React from "react";
import { FormControl } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const ClinicHistoryFieldAnswer = ({ field }) => {
  const renderAnswers = () => {
    switch (field.type) {
      case "RADIO":
      case "CHECKBOX": {
        return field.answers.map((answer) => {
          return (
            <div key={answer.id} className="mb-2">
              <Form.Check
                value={answer.id}
                type={field.type === "RADIO" ? "radio" : "checkbox"}
                name={field.id}
                id={answer.id}
                label={answer.content}
              />
            </div>
          );
        });
      }
      case "SELECT": {
        return (
          <div className="mb-2">
            <FormControl as="select" className="form-select">
              <option value="">Seleccione una opción</option>
              {field.answers.map((answer) => (
                <option value={answer.id} key={answer.id}>
                  {answer.content}
                </option>
              ))}
            </FormControl>
          </div>
        );
      }
      case "STRING": {
        return (
          <div className="mb-2">
            {field.answers.map((answer) => (
              <Form.Control
                key={answer.id}
                className="mb-2"
                type="text"
              ></Form.Control>
            ))}
          </div>
        );
      }
      default: {
        return;
      }
    }
  };
  return (
    <div className="mb-4">
      <h6>{field.content}</h6>
      {renderAnswers()}
    </div>
  );
};

export default ClinicHistoryFieldAnswer;
