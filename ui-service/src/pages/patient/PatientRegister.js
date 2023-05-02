import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import userData from "../../utils/UserData";
import { registerPatient } from "../../slices/patient";
import { useDispatch } from "react-redux";

const PatientRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const initialValues = {
    id: "",
    firstName: "",
    lastName: "",
    genre: {
      value: "",
    },
    civilStatus: {
      value: "",
    },
    nationality: "",
    address: "",
    migratoryState: {
      value: "",
    },
    birthDateDay: "",
    birthDateMonth: {
      value: "",
    },
    birthDateYear: "",
    phoneNumber: "",
    medicalEntity: "",
    healthRegime: "",
    benefitPlan: "",
    socialStratum: "",
    caretaker: "",
    caretakerPhoneNumber: "",

    admissionDay: "",
    admissionMonth: {
      value: "",
    },
    admissionYear: "",
    medicalConsultationReason: "",
  };

  const handleRegister = (formValue) => {
    setLoading(true);
    const { id } = formValue;
    let { birthDateDay } = formValue;
    let { birthDateMonth } = formValue;
    let { birthDateYear } = formValue;
    let correctDateFormat = `${birthDateYear}/${birthDateMonth.value}/${birthDateDay}`;
    let birthDate = new Date(correctDateFormat);
    const { firstName, lastName, civilStatus, genre, address } = formValue;
    const civilStatusId = civilStatus.value;
    const genderId = genre.value;
    const email = "";
    const phoneNumber = formValue;
    const personalInformation = {
      id,
      firstName,
      lastName,
      email,
      birthDate,
      genderId,
      civilStatusId,
      phoneNumber,
      address,
    };
    const { nationality, migratoryState } = formValue;
    const nationalityStateCode = migratoryState.value;
    const nationalityState = {
      nationality: nationality,
      nationalityStateCode: nationalityStateCode,
    };

    let { medicalEntity, healthRegime, benefitPlan, socialStratum } = formValue;
    healthRegime = healthRegime.value;
    const affiliationInformation = {
      medicalEntity,
      healthRegime,
      benefitPlan,
      socialStratum,
    };

    let { admissionDay } = formValue;
    let { admissionMonth } = formValue;
    let { admissionYear } = formValue;
    let correctDateFormatForAdmission = `${admissionYear}/${admissionMonth.value}/${admissionDay}`;
    let admissionDate = new Date(correctDateFormatForAdmission);
    let { caretaker, caretakerPhoneNumber } = formValue;
    let { medicalConsultationReason } = formValue;
    const admissionInformation = {
      caretaker,
      caretakerPhoneNumber,
      admissionDate,
      medicalConsultationReason,
    };

    dispatch(
      registerPatient({
        id,
        personalInformation,
        nationalityState,
        affiliationInformation,
        admissionInformation,
      })
    );
    setSuccessful(true);
    setLoading(false);
  };
  const validationSchema = Yup.object({
    id: Yup.string().required("Este campo es requerido"),
    firstName: Yup.string().required("Este campo es requerido"),
    lastName: Yup.string().required("Este campo es requerido"),
    phoneNumber: Yup.string().required("Este campo es requerido"),
    address: Yup.string().required("Este campo es requerido"),
    birthDateDay: Yup.number()
      .positive()
      .lessThan(32, "Este campo debe ser menor o igual a 31")
      .moreThan(0)
      .required("Este campo es requerido"),
    birthDateYear: Yup.number()
      .positive()
      .moreThan(0, "Este campo debe ser mayor o igual a 1")
      .required("Este campo es requerido"),
    medicalEntity: Yup.string().required("Este campo es requerido"),
    benefitPlan: Yup.string().required("Este campo es requerido"),
    socialStratum: Yup.string().required("Este campo es requerido"),
    admissionDay: Yup.number()
      .positive()
      .lessThan(32, "Este campo debe ser menor o igual a 31")
      .moreThan(0)
      .required("Este campo es requerido"),
    admissionYear: Yup.number()
      .positive()
      .moreThan(0, "Este campo debe ser mayor o igual a 1")
      .required("Este campo es requerido"),
    caretaker: Yup.string().required("Este campo es requerido"),
    caretakerPhoneNumber: Yup.string().required("Este campo es requerido"),
    medicalConsultationReason: Yup.string().required("Este campo es requerido"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: handleRegister,
    validationSchema,
  });
  return (
    <Container className="mb-5">
      {!successful && (
        <Row>
          <Col lg="10" md="10" sm="10" className="mx-auto">
            <Card className="mt-5 mb-5 shadow-lg p-1">
              <Card.Body>
                <h3 className="text-primary">
                  <strong>Crear un paciente en el sistema</strong>
                </h3>
                <hr />
                <h4 className="text-primary">Información personal</h4>

                <Form onSubmit={formik.handleSubmit}>
                  <Row className="py-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="id">
                        <Form.Label>
                          <strong>Identificación:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="identificación del paciente"
                          value={formik.values.id}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.errors.id && formik.touched.id}
                        ></Form.Control>
                        {formik.errors.id && formik.touched.id ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.id}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>
                          <strong>Nombre del Paciente:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g Rodrigo"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.firstName && formik.touched.firstName
                          }
                        ></Form.Control>
                        {formik.errors.firstName && formik.touched.firstName ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.firstName}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>
                          <strong>Apellido del paciente:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g Osorio"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.lastName && formik.touched.lastName
                          }
                        ></Form.Control>
                        {formik.errors.lastName && formik.touched.lastName ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.lastName}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <div className="mb-2">
                        <strong>Género:</strong>
                      </div>
                      <Form.Group controlId="genre">
                        <Form.Select
                          name="genre.value"
                          onChange={formik.handleChange}
                        >
                          <option value="">Seleccione una opción</option>
                          {userData.gender.map((status, index) => (
                            <option key={index} value={status.value}>
                              {status.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={12} sm={12}>
                      <div className="mb-2">
                        <strong>Estado civil:</strong>
                      </div>
                      <Form.Group controlId="civilStatus">
                        <Form.Select
                          name="civilStatus.value"
                          onChange={formik.handleChange}
                          className="mt-2"
                        >
                          <option value="">Seleccione una opción</option>
                          {userData.civilStatus.map((status, index) => (
                            <option key={index} value={status.value}>
                              {status.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="nationality">
                        <Form.Label>
                          <strong>Nacionalidad del paciente:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g Colombia"
                          value={formik.values.nationality}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.nationality &&
                            formik.touched.nationality
                          }
                        ></Form.Control>
                        {formik.errors.nationality &&
                        formik.touched.nationality ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.nationality}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="migratoryState">
                        <Form.Label>
                          <strong>Estado migratorio del paciente:</strong>
                        </Form.Label>
                        <Form.Select
                          name="migratoryState.value"
                          onChange={formik.handleChange}
                        >
                          <option value="">Seleccione una opción</option>
                          {userData.migratoryState.map((status, index) => (
                            <option key={index} value={status.value}>
                              {status.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Label>
                        <strong>Fecha de Nacimiento:</strong>
                      </Form.Label>
                      <Row>
                        <Col lg={4}>
                          <Form.Group controlId="birthDateDay">
                            <Form.Control
                              className="mb-2"
                              type="number"
                              placeholder="DD"
                              value={formik.values.birthDateDay}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.birthDateDay &&
                                formik.touched.birthDateDay
                              }
                            ></Form.Control>
                            {formik.errors.birthDateDay &&
                            formik.touched.birthDateDay ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.birthDateDay}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={4}>
                          <Form.Group controlId="birthDateMonth">
                            <Form.Select
                              className="mb-2"
                              name="birthDateMonth.value"
                              onChange={formik.handleChange}
                            >
                              <option value="">Seleccione una opción</option>
                              {userData.months.map((status, index) => (
                                <option key={index} value={status.value}>
                                  {status.name}
                                </option>
                              ))}
                            </Form.Select>
                            {formik.errors.birthDateMonth &&
                            formik.touched.birthDateMonth ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.birthDateMonth}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={4}>
                          <Form.Group controlId="birthDateYear">
                            <Form.Control
                              className="mb-2"
                              type="text"
                              placeholder="AAAA"
                              value={formik.values.birthDateYear}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.birthDateYear &&
                                formik.touched.birthDateYear
                              }
                            ></Form.Control>
                            {formik.errors.birthDateYear &&
                            formik.touched.birthDateYear ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.birthDateYear}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="my-3" controlId="phoneNumber">
                        <Form.Label>
                          <strong>Número de teléfono:</strong>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.phoneNumber &&
                            formik.touched.phoneNumber
                          }
                        ></Form.Control>
                        {formik.errors.phoneNumber &&
                        formik.touched.phoneNumber ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.phoneNumber}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="my-3" controlId="address">
                        <Form.Label>
                          <strong>Dirección:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Carrera 11 #95 - 37, Bogotá"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.address && formik.touched.address
                          }
                        ></Form.Control>
                        {formik.errors.address && formik.touched.address ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.address}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr />
                  <h4 className="text-primary">Información de afiliación</h4>
                  <Row>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="my-3" controlId="medicalEntity">
                        <Form.Label>
                          <strong>Entidad:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.medicalEntity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.medicalEntity &&
                            formik.touched.medicalEntity
                          }
                        ></Form.Control>
                        {formik.errors.medicalEntity &&
                        formik.touched.medicalEntity ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.medicalEntity}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="my-3" controlId="healthRegime">
                        <Form.Label>
                          <strong>Régimen de salud:</strong>
                        </Form.Label>
                        <Form.Select
                          className="mb-2"
                          name="healthRegime.value"
                          onChange={formik.handleChange}
                        >
                          <option value="">Seleccione una opción</option>
                          {userData.healthRegime.map((status, index) => (
                            <option key={index} value={status.value}>
                              {status.name}
                            </option>
                          ))}
                        </Form.Select>
                        {formik.errors.healthRegime &&
                        formik.touched.healthRegime ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.healthRegime}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="my-3" controlId="benefitPlan">
                        <Form.Label>
                          <strong>Plan de beneficios:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.benefitPlan}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.benefitPlan &&
                            formik.touched.benefitPlan
                          }
                        ></Form.Control>
                        {formik.errors.benefitPlan &&
                        formik.touched.benefitPlan ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.benefitPlan}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="my-3" controlId="socialStratum">
                        <Form.Label>
                          <strong>Estrato:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.socialStratum}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.socialStratum &&
                            formik.touched.socialStratum
                          }
                        ></Form.Control>
                        {formik.errors.socialStratum &&
                        formik.touched.socialStratum ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.socialStratum}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr />
                  <h4 className="text-primary">Información del ingreso</h4>
                  <Row>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="my-3" controlId="caretaker">
                        <Form.Label>
                          <strong>Responsable:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.caretaker}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.caretaker && formik.touched.caretaker
                          }
                        ></Form.Control>
                        {formik.errors.caretaker && formik.touched.caretaker ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.caretaker}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group
                        className="my-3"
                        controlId="caretakerPhoneNumber"
                      >
                        <Form.Label>
                          <strong>Teléfono del Responsable:</strong>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={formik.values.caretakerPhoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.caretakerPhoneNumber &&
                            formik.touched.caretakerPhoneNumber
                          }
                        ></Form.Control>
                        {formik.errors.caretakerPhoneNumber &&
                        formik.touched.caretakerPhoneNumber ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.caretakerPhoneNumber}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={12} sm={12}>
                      <Row>
                        <Form.Label>
                          <strong>Fecha de Ingreso:</strong>
                        </Form.Label>
                        <Col lg={4}>
                          <Form.Group controlId="admissionDay">
                            <Form.Control
                              className="mb-2"
                              type="number"
                              placeholder="DD"
                              value={formik.values.admissionDay}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.admissionDay &&
                                formik.touched.admissionDay
                              }
                            ></Form.Control>
                            {formik.errors.admissionDay &&
                            formik.touched.admissionDay ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.admissionDay}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={4}>
                          <Form.Group controlId="admissionMonth">
                            <Form.Select
                              className="mb-2"
                              name="admissionMonth.value"
                              onChange={formik.handleChange}
                            >
                              <option value="">Seleccione una opción</option>
                              {userData.months.map((status, index) => (
                                <option key={index} value={status.value}>
                                  {status.name}
                                </option>
                              ))}
                            </Form.Select>
                            {formik.errors.admissionMonth &&
                            formik.touched.admissionMonth ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.admissionMonth}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={4}>
                          <Form.Group controlId="admissionYear">
                            <Form.Control
                              className="mb-2"
                              type="text"
                              placeholder="AAAA"
                              value={formik.values.admissionYear}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.admissionYear &&
                                formik.touched.admissionYear
                              }
                            ></Form.Control>
                            {formik.errors.admissionYear &&
                            formik.touched.admissionYear ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.admissionYear}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group
                        className="my-3"
                        controlId="medicalConsultationReason"
                      >
                        <Form.Label>
                          <strong>Motivo de la consulta:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.medicalConsultationReason}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.medicalConsultationReason &&
                            formik.touched.medicalConsultationReason
                          }
                        ></Form.Control>
                        {formik.errors.medicalConsultationReason &&
                        formik.touched.medicalConsultationReason ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.medicalConsultationReason}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr />
                  <div className="d-flex flex-row-reverse">
                    <Button variant="primary" type="submit">
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>

                          <span>Creando Paciente</span>
                        </>
                      ) : (
                        <span>Crear Paciente</span>
                      )}
                    </Button>
                  </div>
                </Form>
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
      {successful && (
        <div className="alert">
          <Row>
            <Col lg="10" md="10" sm="10" className="mx-auto">
              <Alert variant="success">
                ¡El paciente con número de identificación{" "}
                <strong>{formik.values.id}</strong> ha sido creado exitosamente!
              </Alert>
              <Button
                variant="outline-primary"
                onClick={() => navigate("/patients/emtPatients")}
              >
                Volver atrás
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default PatientRegister;
