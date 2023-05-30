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
    mainDiseaseName: "",
    mainDiseaseCode: "",
    secondDiseaseOneName: "",
    secondDiseaseOneCode: "",
    secondDiseaseTwoName: "",
    secondDiseaseTwoCode: "",
    secondDiseaseThreeName: "",
    secondDiseaseThreeCode: "",
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
    const phoneNumber = "";
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
    const {
      mainDiseaseCode,
      mainDiseaseName,
      secondDiseaseOneCode,
      secondDiseaseOneName,
      secondDiseaseThreeCode,
      secondDiseaseThreeName,
      secondDiseaseTwoCode,
      secondDiseaseTwoName,
    } = formValue;
    const diseaseHistorial = {
      firstDisease: {
        code: mainDiseaseCode,
        name: mainDiseaseName,
      },
      secondDisease: {
        code: secondDiseaseOneCode,
        name: secondDiseaseOneName,
      },
      thirdDisease: {
        code: secondDiseaseTwoCode,
        name: secondDiseaseTwoName,
      },
      fourthDisease: {
        code: secondDiseaseThreeCode,
        name: secondDiseaseThreeName,
      },
    };
    const { nationality, migratoryState } = formValue;
    const nationalityStateCode = migratoryState.value;
    const nationalityState = {
      nationality: nationality,
      nationalityStateCode: nationalityStateCode,
    };
    console.log(formik.values);
    dispatch(
      registerPatient({
        id,
        personalInformation,
        diseaseHistorial,
        nationalityState,
      })
    );
    setSuccessful(true);
    setLoading(false);
  };
  const validationSchema = Yup.object({
    id: Yup.string().required("Este campo es requerido"),
    firstName: Yup.string().required("Este campo es requerido"),
    lastName: Yup.string().required("Este campo es requerido"),
    birthDateDay: Yup.number()
      .positive()
      .lessThan(32, "Este campo debe ser menor o igual a 31")
      .moreThan(0)
      .required("Este campo es requerido"),
    birthDateYear: Yup.number()
      .positive()
      .moreThan(0, "Este campo debe ser mayor o igual a 1")
      .required("Este campo es requerido"),
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
                  <hr />
                  <h4 className="text-primary">
                    Información Clínica del Paciente
                  </h4>
                  <Row className="py-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Label>
                        <strong>Enfermedad principal:</strong>
                      </Form.Label>
                      <Row>
                        <Col lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="mainDiseaseCode"
                          >
                            <Form.Control
                              className="mb-2"
                              type="text"
                              placeholder="Código de la enfermedad"
                              value={formik.values.mainDiseaseCode}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.mainDiseaseCode &&
                                formik.touched.mainDiseaseCode
                              }
                            ></Form.Control>
                            {formik.errors.mainDiseaseCode &&
                            formik.touched.mainDiseaseCode ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.mainDiseaseCode}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="mainDiseaseName"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Nombre de la enfermedad"
                              value={formik.values.mainDiseaseName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.mainDiseaseName &&
                                formik.touched.mainDiseaseName
                              }
                            ></Form.Control>
                            {formik.errors.mainDiseaseName &&
                            formik.touched.mainDiseaseName ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.mainDiseaseName}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Label>
                        <strong>Enfermedad secundaria #1:</strong>
                      </Form.Label>
                      <Row>
                        <Col lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="secondDiseaseOneCode"
                          >
                            <Form.Control
                              className="mb-2"
                              type="text"
                              placeholder="Código de la enfermedad"
                              value={formik.values.secondDiseaseOneCode}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.secondDiseaseOneCode &&
                                formik.touched.secondDiseaseOneCode
                              }
                            ></Form.Control>
                            {formik.errors.secondDiseaseOneCode &&
                            formik.touched.secondDiseaseOneCode ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.secondDiseaseOneCode}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="secondDiseaseOneName"
                          >
                            <Form.Control
                              className="mb-2"
                              type="text"
                              placeholder="Nombre de la enfermedad"
                              value={formik.values.secondDiseaseOneName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.secondDiseaseOneName &&
                                formik.touched.secondDiseaseOneName
                              }
                            ></Form.Control>
                            {formik.errors.secondDiseaseOneName &&
                            formik.touched.secondDiseaseOneName ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.secondDiseaseOneName}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Label>
                        <strong>Enfermedad secundaria #2:</strong>
                      </Form.Label>
                      <Row>
                        <Col lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="secondDiseaseTwoCode"
                          >
                            <Form.Control
                              className="mb-2"
                              type="text"
                              placeholder="Código de la enfermedad"
                              value={formik.values.secondDiseaseTwoCode}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.secondDiseaseTwoCode &&
                                formik.touched.secondDiseaseTwoCode
                              }
                            ></Form.Control>
                            {formik.errors.secondDiseaseTwoCode &&
                            formik.touched.secondDiseaseTwoCode ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.secondDiseaseTwoCode}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="secondDiseaseTwoName"
                          >
                            <Form.Control
                              className="mb-2"
                              type="text"
                              placeholder="Nombre de la enfermedad"
                              value={formik.values.secondDiseaseTwoName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.secondDiseaseTwoName &&
                                formik.touched.secondDiseaseTwoName
                              }
                            ></Form.Control>
                            {formik.errors.secondDiseaseTwoName &&
                            formik.touched.secondDiseaseTwoName ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.secondDiseaseTwoName}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Label>
                        <strong>Enfermedad secundaria #3:</strong>
                      </Form.Label>
                      <Row>
                        <Col lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="secondDiseaseThreeCode"
                          >
                            <Form.Control
                              className="mb-2"
                              type="text"
                              placeholder="Código de la enfermedad"
                              value={formik.values.secondDiseaseThreeCode}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.secondDiseaseThreeCode &&
                                formik.touched.secondDiseaseThreeCode
                              }
                            ></Form.Control>
                            {formik.errors.secondDiseaseThreeCode &&
                            formik.touched.secondDiseaseThreeCode ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.secondDiseaseThreeCode}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="secondDiseaseThreeName"
                          >
                            <Form.Control
                              className="mb-2"
                              type="text"
                              placeholder="Nombre de la enfermedad"
                              value={formik.values.secondDiseaseThreeName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.secondDiseaseThreeName &&
                                formik.touched.secondDiseaseThreeName
                              }
                            ></Form.Control>
                            {formik.errors.secondDiseaseThreeName &&
                            formik.touched.secondDiseaseThreeName ? (
                              <Alert className="mt-3" variant="danger">
                                {formik.errors.secondDiseaseThreeName}
                              </Alert>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
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
                onClick={() => navigate("/users/emtPatients")}
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
