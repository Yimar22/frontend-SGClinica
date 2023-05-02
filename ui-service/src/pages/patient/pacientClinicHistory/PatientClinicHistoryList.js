import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const PatientClincHistoryList = ({ patient }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <Card.Title className="ms-4 mt-4">
          <h4>
            <strong>
              Historias clinicas para el paciente{" "}
              {patient.personalInformation.firstName}{" "}
              {patient.personalInformation.lastName}{" "}
            </strong>
          </h4>
        </Card.Title>
        <Card.Body className="ms-2">
          <h5>El paciente registra las siguientes historias clínicas:</h5>
          <div>
            <ul>
              <li>
                <Row>
                  <Col lg={3} md={12} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <strong>Identificador:</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value="3"
                        disabled={true}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={12} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <strong>Nombre del formato:</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value="Historia Clínica General"
                        disabled={true}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={12} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <strong>Fecha de creación:</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value="13/12/2022"
                        disabled={true}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={12} sm={12}>
                    <Form.Label>
                      <strong>Inspeccionar:</strong>
                    </Form.Label>
                    <Button
                      onClick={() =>
                        navigate(
                          "/patients/patientNewClinicHistoryView/123446678/:5"
                        )
                      }
                    >
                      &#128270;
                    </Button>
                  </Col>
                </Row>
              </li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default PatientClincHistoryList;
