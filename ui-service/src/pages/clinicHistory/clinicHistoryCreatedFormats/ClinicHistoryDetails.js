import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClinicHistoryFormatById } from "../../../slices/clinicHistory";
import ClinicHistoryFieldAnswer from "./ClinicHistoryFieldAnswer";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const ClinicHistoryDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const clinicHistoryId = params.clinicHistoryId;
  const { loading, clinicHistory } = useSelector(
    (state) => state.clinicHistory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClinicHistoryFormatById(clinicHistoryId));
  }, [clinicHistoryId, dispatch]);

  const renderFields = () => {
    return clinicHistory.payload.map((field) => (
      <ClinicHistoryFieldAnswer
        field={field}
        key={field.id}
      ></ClinicHistoryFieldAnswer>
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
                  {clinicHistory && (
                    <>
                      <h2 className="text-primary">
                        <strong>{clinicHistory.name}</strong>
                      </h2>
                      <hr />
                      <div className="mt-4 mb-4">
                        <h6 className="note">{clinicHistory.description}</h6>
                      </div>
                      <div>{renderFields()}</div>
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
      {loading && (
        <Container className="mb-5">
          <Row>
            <Col sm="10" md="10" lg="10" className="mx-auto">
              <Card className="mt-5 mb-5 shadow-lg p-1">
                <Card.Body>
                  <h2 className="text-primary">
                    <strong>Cargando modelo de historia clínica</strong>
                  </h2>
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

export default ClinicHistoryDetails;
