import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getClinicHistoryFormatById } from "../../../slices/clinicHistory";
import { getPatientById } from "../../../slices/patient";
import PatientClinicHistoryFieldAnswer from "./PatientClinicHistoryFieldAnswer";
const PatientNewClinicHistoryFormat = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const patientId = params.patientId;
  const clinicHistoryId = params.clinicHistoryId;
  const { loading, patient } = useSelector((state) => state.patient);
  const { clinicHistory } = useSelector((state) => state.clinicHistory);
  useEffect(() => {
    dispatch(getPatientById(patientId));
    dispatch(getClinicHistoryFormatById(clinicHistoryId));
  }, [dispatch, patientId, clinicHistoryId]);

  const renderClinicHistoryFields = () => {
    return clinicHistory.payload.map((field) => (
      <PatientClinicHistoryFieldAnswer
        field={field}
        key={field.id}
      ></PatientClinicHistoryFieldAnswer>
    ));
  };
  return (
    <>
      {!loading && (
        <Container className="mb-5">
          <Row>
            <Col sm="10" md="10" lg="10" className="mx-auto">
              <Card className="mt-5 mb-5 shadow-lg p-1">
                <Card.Body>
                  <Card.Title>
                    <h4 className="text-primary">
                      <strong>
                        Informacion básica del paciente{" "}
                        {patient.personalInformation.firstName}{" "}
                        {patient.personalInformation.lastName}
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
                                value={patient.personalInformation.firstName}
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
                                value={patient.personalInformation.lastName}
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
                            value={patient.id}
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
                                value={new Date(
                                  patient.personalInformation.birthDate
                                ).toLocaleDateString()}
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
                                value={patient.personalInformation.age}
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
                            value={patient.personalInformation.gender.name}
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
                            value={patient.personalInformation.civilStatus.name}
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
                  {clinicHistory && (
                    <>
                      <h4 className="text-primary">
                        <strong>
                          Historia clínica: {clinicHistory.name} para{" "}
                          {patient.personalInformation.firstName}{" "}
                          {patient.personalInformation.lastName}
                        </strong>
                      </h4>
                      <hr />
                      <div className="mt-4 mb-4">
                        <h5 className="note">{clinicHistory.description}</h5>
                      </div>
                      <div>{renderClinicHistoryFields()}</div>
                      <hr />
                      <div className="d-flex flex-row-reverse">
                        <Button variant="outline-primary" onClick={() => {}}>
                          Guardar Historia Clínica
                        </Button>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
              <Button variant="outline-primary" onClick={() => navigate(-1)}>
                Volver atrás
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PatientNewClinicHistoryFormat;
