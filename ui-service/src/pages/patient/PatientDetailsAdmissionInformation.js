import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

const PatientDetailsAdmissionInformation = ({ patient, admissions }) => {
  return (
    <>
      <Card>
        <Card.Title className="ms-4 mt-4">
          <h4>
            <strong>
              Información de Admisión del paciente{" "}
              {patient.personalInformation.firstName}{" "}
              {patient.personalInformation.lastName}
            </strong>
          </h4>
        </Card.Title>
        <Card.Body className="ms-2">
          <h5>
            <strong>Información sobre admisión:</strong>
          </h5>
          <Form>
            <Row>
              {admissions.map((admission) => (
                <>
                  <Col lg={4} md={12} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <strong>Identificador:</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={admission.id}
                        disabled={true}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="nacionality">
                      <Form.Label>
                        <strong>Fecha de ingreso:</strong>
                      </Form.Label>
                      <Row>
                        <Col lg={12} md={8} sm={8}>
                          <Form.Control
                            type="text"
                            value={new Date(
                              admission.admissionDate
                            ).toLocaleDateString()}
                            disabled={true}
                          ></Form.Control>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={12} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <strong>Responsable:</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={admission.caretaker}
                        disabled={true}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <hr />
                </>
              ))}
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default PatientDetailsAdmissionInformation;
