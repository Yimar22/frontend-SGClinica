import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

const PatientDetailsNacionality = ({ patient }) => {
  return (
    <>
      <Card>
        <Card.Title className="ms-4 mt-4">
          <h4>
            <strong>
              Información sobre la nacionalidad del paciente{" "}
              {patient.personalInformation.firstName}{" "}
              {patient.personalInformation.lastName}
            </strong>
          </h4>
        </Card.Title>
        <Card.Body className="ms-2">
          <h5>
            <strong>Información de la nacionalidad:</strong>
          </h5>
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="nacionality">
                  <Form.Label>
                    <strong>Nacionalidad:</strong>
                  </Form.Label>
                  <Row>
                    <Col lg={12} md={8} sm={8}>
                      <Form.Control
                        type="text"
                        value={patient.nationalityState.nationality}
                        disabled={true}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="nacionalityState">
                  <Form.Label>
                    <strong>Estado Migratorio:</strong>
                  </Form.Label>
                  <Row>
                    <Col lg={12} md={8} sm={8}>
                      <Form.Control
                        type="text"
                        value={patient.nationalityState.nationalityStateName}
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

export default PatientDetailsNacionality;
