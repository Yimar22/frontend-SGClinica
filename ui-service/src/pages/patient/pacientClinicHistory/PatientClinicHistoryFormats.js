import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById } from "../../../slices/patient";
import PatientCreateNewClinicHistory from "./PatientCreateNewClinicHistory";

const PatientClinicHistoryFormats = () => {
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
                      Información Clínica del Paciente{" "}
                      {patient.personalInformation.firstName}{" "}
                      {patient.personalInformation.lastName} ({patient.id})
                    </strong>
                  </h3>
                </Card.Title>
                <Tabs
                  defaultActiveKey="patientNewClinicHistory"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab
                    eventKey="patientClinicHistorySummary"
                    title="Historias clínicas del paciente"
                  ></Tab>
                  <Tab
                    eventKey="patientNewClinicHistory"
                    title="Nueva historia clínica para el paciente"
                  >
                    <PatientCreateNewClinicHistory patient={patient} />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
            <Button variant="outline-primary" onClick={() => navigate(-1)}>
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
            <Button variant="outline-primary" onClick={() => navigate(-1)}>
              Volver atrás
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PatientClinicHistoryFormats;
