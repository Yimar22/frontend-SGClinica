import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  clinicHistoryContent,
  clinicHistoryDescription,
  orderQuestions,
} from "../../../slices/clinicHistory";
import Question from "./Question";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { saveClinicHistoryModel } from "../../../services/clinicHistory.service";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const ClinicHistory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const clinicHistory = useSelector((state) => state.clinicHistory);
  const renderQuestions = () => {
    return clinicHistory.questions.map((question, index) => {
      return (
        <Draggable key={question.id} draggableId={question.id} index={index}>
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Question index={index}></Question>
              </div>
            );
          }}
        </Draggable>
      );
    });
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    dispatch(
      orderQuestions({
        source: result.source.index,
        destination: result.destination.index,
      })
    );
  };
  const createClinicHistoryModel = async () => {
    setLoading(true);
    const enabled = clinicHistory.opened === true ? 1 : 0;
    const data = {
      name: clinicHistory.content,
      description: clinicHistory.description,
      enabled: enabled,
      payload: JSON.stringify(clinicHistory.questions),
    };
    try {
      await saveClinicHistoryModel(data);
      setLoading(false);
      setSuccessful(true);
    } catch (errors) {}
  };

  return (
    <Container className="mt-5 mb-5">
      {!successful && (
        <Row>
          <Col className="mx-auto" sm="10" md="10" lg="8">
            <h3 className="text-primary">
              <strong>Creación de un modelo de Historia Clínica</strong>
            </h3>
            <hr />
            <div className="mt-4 mb-4">
              <h6 className="note">
                Nota: El usuario puede arrastrar la pregunta y posicionarla
                según como desee haciendo click mantenido sobre el cuadro que
                contiene la pregunta y soltándola en la posición destino.
              </h6>
            </div>
            <FloatingLabel
              controlId="clinicHistory-content"
              label="Título del modelo de historia clínica"
              className="mb-2"
            >
              <Form.Control
                value={clinicHistory.content}
                onChange={(e) => dispatch(clinicHistoryContent(e.target.value))}
                size="lg"
                type="text"
                placeholder="Título de la historia clínica"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="clinicHistory-description"
              label="Descripción del modelo de historia clínica"
              className="mb-2"
            >
              <Form.Control
                value={clinicHistory.description}
                onChange={(e) =>
                  dispatch(clinicHistoryDescription(e.target.value))
                }
                size="lg"
                type="text"
                placeholder="Descripción del modelo de historia clínica"
              />
            </FloatingLabel>

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId={uuid()}>
                {(provided) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {renderQuestions()}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>

            <Button
              variant="outline-primary"
              className="mt-5"
              onClick={createClinicHistoryModel}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>

                  <span>Creando modelo de Historia Clínica</span>
                </>
              ) : (
                <span>Crear modelo de Historia Clínica</span>
              )}
            </Button>
          </Col>
        </Row>
      )}
      {successful && (
        <div className="alert">
          <Row>
            <Col lg="10" md="10" sm="10" className="mx-auto">
              <Alert variant="success">
                ¡La historia clínica "<strong>{clinicHistory.content}</strong>"
                ha sido creada exitosamente!
              </Alert>
              <Button
                variant="outline-primary"
                onClick={() => navigate("/clinicHistory/createClinicHistory")}
              >
                Ir a las historias clínicas
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ClinicHistory;
