import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const PatientClinicHistoryView = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col sm="10" md="10" lg="10" className="mx-auto">
            <Card className="mt-5 mb-5 shadow-lg p-1">
              <Card.Body>
                <Card.Title>
                  <h4 className="text-primary">
                    <strong>
                      Informacion básica del paciente Paola Osorio
                    </strong>
                  </h4>
                </Card.Title>
                <hr />
                <Form>
                  <Row className="py-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>
                          <strong>Nombre:</strong>
                        </Form.Label>
                        <Row>
                          <Col lg={12} md={8} sm={8}>
                            <Form.Control
                              type="text"
                              value="Paola"
                              disabled={true}
                            ></Form.Control>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>
                          <strong>Apellido:</strong>
                        </Form.Label>
                        <Row>
                          <Col lg={12} md={8} sm={8}>
                            <Form.Control
                              type="text"
                              value="Osorio"
                              disabled={true}
                            ></Form.Control>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="pb-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="id">
                        <Form.Label>
                          <strong>Identificación:</strong>
                        </Form.Label>

                        <Form.Control
                          type="text"
                          value="123446678"
                          disabled={true}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Row>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Label>
                            <strong>Fecha de nacimiento:</strong>
                          </Form.Label>
                          <Form.Group controlId="dob">
                            <Form.Control
                              type="text"
                              name=""
                              value="22/02/1994"
                              disabled={true}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Label>
                            <strong>Edad:</strong>
                          </Form.Label>
                          <Form.Group controlId="age">
                            <Form.Control
                              type="text"
                              name=""
                              value="27"
                              disabled={true}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="pb-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Label>
                        <strong>Género:</strong>
                      </Form.Label>

                      <Form.Group controlId="genre">
                        <Form.Control
                          type="text"
                          name=""
                          value="Femenino"
                          disabled={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Label>
                        <strong>Estado Civil:</strong>
                      </Form.Label>

                      <Form.Group controlId="civilStatus">
                        <Form.Control
                          type="text"
                          name=""
                          value="Soltera"
                          disabled={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
            <Card className="mt-5 mb-5 shadow-lg p-1">
              <Card.Body>
                <h4 className="text-primary">
                  <strong>
                    Historia clínica: Historia Clínica General para Paola Osorio
                  </strong>
                </h4>
                <hr />
                <div className="mt-4 mb-4">
                  <h5 className="note">
                    Historia clínica que contiene información general
                  </h5>
                </div>
                <div>
                  <div className="mb-2">
                    Describa el motivo de consulta de paciente:{" "}
                  </div>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value="Fuerte dolor abdominal"
                      disabled={true}
                    ></Form.Control>
                  </Form.Group>
                  <hr />
                  <div className="mb-2">
                    ¿Cuáles de las siguientes enfermedades ha tenido el
                    paciente?
                  </div>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      value="Asma"
                      label="Asma"
                      checked={true}
                    ></Form.Check>
                  </Form.Group>
                  <hr />
                  <div className="mb-2">
                    Seleccione cada cuánto el paciente se realiza exámenes
                    médicos
                  </div>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      value="Entre 2 a 4 veces al año"
                      label="Entre 2 a 4 veces al año"
                      checked={true}
                    ></Form.Check>
                  </Form.Group>
                  <hr />
                  <div className="mb-2">
                    ¿Con que tipo de grupo se identifica más el paciente?
                  </div>
                  <Form.Select className="mb-2">
                    <option value="">Deportista</option>
                  </Form.Select>
                </div>

                <hr />
                <div className="d-flex flex-row-reverse">
                  <Button variant="outline-primary" onClick={() => {}}>
                    Imprimir historia clínica
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <Button variant="outline-primary" onClick={() => navigate(-1)}>
              Volver atrás
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PatientClinicHistoryView;
