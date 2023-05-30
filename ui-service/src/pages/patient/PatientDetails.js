import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById } from "../../slices/patient";
import PatientDetailsAdmissionInformation from "./PatientDetailsAdmissionInformation";
import PatientDetailsNacionality from "./PatientDetailsNacionality";
import PatientDetailsPersonalInformation from "./PatientDetailsPersonalInformation";
const PatientDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const patientId = params.patientId;
  const { loading, patient } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(getPatientById(patientId));
  }, [dispatch, patientId]);

  return (
    <Container className="mt-5">
      {!loading ? (
        <Row>
          <Col lg="10" md="10" sm="10" className="mx-auto">
            <Card className="mb-5 shadow-lg p-1">
              <Card.Body>
                <Card.Title>
                  <h3>
                    <strong>
                      Información del Paciente:{" "}
                      {patient.personalInformation.firstName}{" "}
                      {patient.personalInformation.lastName} ({patient.id})
                    </strong>
                  </h3>
                </Card.Title>
                <Tabs
                  defaultActiveKey="personalInformation"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab
                    eventKey="personalInformation"
                    title="Información Personal"
                  >
                    <PatientDetailsPersonalInformation patient={patient} />
                  </Tab>
                  <Tab
                    eventKey="nationalityInformation"
                    title="Información sobre la Nacionalidad"
                  >
                    <PatientDetailsNacionality patient={patient} />
                  </Tab>
                  <Tab
                    eventKey="admissionInformation"
                    title="Información de admisión"
                  >
                    <PatientDetailsAdmissionInformation patient={patient} />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
            <Button
              variant="outline-primary"
              onClick={() => navigate("/patients/emtPatients")}
            >
              Volver atrás
            </Button>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col lg="10" md="10" sm="10" className="mx-auto">
            <Card className="mt-5 mb-5 shadow-lg p-1">
              <Card.Body>
                <Card.Title>
                  <h3>
                    <strong>Cargando información del paciente</strong>
                  </h3>
                </Card.Title>
                <hr />
                <Card></Card>
              </Card.Body>
            </Card>
            <Button
              variant="outline-primary"
              onClick={() => navigate("/patients/emtPatients")}
            >
              Volver atrás
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PatientDetails;
