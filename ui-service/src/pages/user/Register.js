import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { Alert } from "react-bootstrap";
import { register, registerPersonalInformation } from "../../slices/user";
import * as Yup from "yup";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import userData from "../../utils/UserData";
import "react-datepicker/dist/react-datepicker.css";

const Register = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    UserService.getAllRoles().then((data) => {
      setRoles(data);
    });
  }, [setRoles]);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    id: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    genre: {
      value: "",
    },
    civilStatus: {
      value: "",
    },
    phoneNumber: "",
    rolesIds: [],
    address: "",
    birthDateDay: "",
    birthDateMonth: {
      value: "",
    },
    birthDateYear: "",
    professionalCard: "",
  };

  const handleRegister = (formValue) => {
    const { id, password, rolesIds } = formValue;

    const {
      civilStatus,
      genre,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      professionalCard,
    } = formValue;
    const civilStatusId = civilStatus.value;
    const genderId = genre.value;
    let { birthDateDay } = formValue;
    let { birthDateMonth } = formValue;
    let { birthDateYear } = formValue;
    let correctDateFormat = `${birthDateYear}/${birthDateMonth.value}/${birthDateDay}`;
    let birthDate = new Date(correctDateFormat);
    let username = id;
    setSuccessful(false);
    dispatch(register({ username, password, rolesIds, professionalCard }));
    dispatch(
      registerPersonalInformation({
        id,
        firstName,
        lastName,
        email,
        birthDate,
        genderId,
        civilStatusId,
        phoneNumber,
        address,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch((error) => {
        setSuccessful(false);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato inválido de email")
      .required("Este campo es requerido"),
    password: Yup.string().required("Este campo es requerido"),
    id: Yup.string().required("Este campo es requerido"),
    firstName: Yup.string().required("Este campo es requerido"),
    lastName: Yup.string().required("Este campo es requerido"),
    phoneNumber: Yup.string().required("Este campo es requerido"),
    address: Yup.string().required("Este campo es requerido"),
    birthDateDay: Yup.number()
      .positive()
      .lessThan(32, "Este campo debe ser menor a 31")
      .moreThan(0)
      .required("Este campo es requerido"),
    birthDateYear: Yup.number()
      .positive()
      .moreThan(0)
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
                  <strong>Crear cuenta para un usuario</strong>
                </h3>
                <hr />
                <h4 className="text-primary">Información de usuario</h4>

                <Form onSubmit={formik.handleSubmit}>
                  <Row className="py-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>
                          <strong>Correo electrónico:</strong>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placheholder="test@test.com"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.email && formik.touched.email
                          }
                        ></Form.Control>
                        {formik.errors.email && formik.touched.email ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.email}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>
                          <strong>Contraseña:</strong>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placheholder="********"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.password && formik.touched.password
                          }
                        ></Form.Control>
                        {formik.errors.password && formik.touched.password ? (
                          <Alert className="mt-3" variant="danger">
                            {formik.errors.password}
                          </Alert>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="professionalCard">
                        <Form.Label>
                          <strong>Tarjeta profesional (Opcional):</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.professionalCard}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.professionalCard &&
                            formik.touched.professionalCard
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr />
                  <h4 className="text-primary">Información personal</h4>
                  <Row className="py-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>
                          <strong>Nombre:</strong>
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

                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>
                          <strong>Apellido:</strong>
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
                  </Row>
                  <Row className="pb-2">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group className="mb-3" controlId="id">
                        <Form.Label>
                          <strong>Número de identificación:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
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
                              name="birthDateMonth.value"
                              onChange={formik.handleChange}
                              className="mb-2"
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
                              type="text"
                              placeholder="AAAA"
                              className="mb-2"
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
                  <Row></Row>
                  <Row>
                    <div className="mb-2">
                      <strong>Rol del usuario:</strong>
                    </div>
                    {roles.map((role) => (
                      <Col lg={12} sm={12} md={12} key={role.name}>
                        <Form.Check
                          type="checkbox"
                          className="mx-2"
                          name="rolesIds"
                          value={role.name}
                          label={`${role.doimainName}: ${role.description} `}
                          onChange={formik.handleChange}
                        />
                      </Col>
                    ))}
                  </Row>
                  <hr />
                  <div className="d-flex flex-row-reverse">
                    <Button variant="primary" type="submit">
                      Crear cuenta
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <Button
              variant="outline-primary"
              onClick={() => navigate("/users/emtUsers")}
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
                ¡El usuario <strong>{formik.values.username}</strong> ha sido
                creado exitosamente!
              </Alert>
              <Button
                variant="outline-primary"
                onClick={() => navigate("/users/emtUsers")}
              >
                Volver atrás
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {message && (
        <div className="alert">
          <Row>
            <Col lg="8" md="10" sm="10" className="mx-auto">
              <Alert variant="danger">{message}</Alert>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Register;
