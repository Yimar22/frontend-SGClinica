import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

const PatientDetailsAdmissionInformation = ({ patient }) => {
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
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="nacionality">
                  <Form.Label>
                    <strong>Fecha de ingreso:</strong>
                  </Form.Label>
                  <Row>
                    <Col lg={12} md={8} sm={8}>
                      <Form.Control
                        type="text"
                        value={new Date(
                          patient.creationDate
                        ).toLocaleDateString()}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default PatientDetailsAdmissionInformation;
