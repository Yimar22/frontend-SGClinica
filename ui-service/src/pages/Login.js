import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import landing from "../img/landing2.jpg";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Este campo es requerido."),
    password: Yup.string().required("Este campo es requerido."),
  });
  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        changeToProfile();
        props.history.push("/login");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleLogin,
    validationSchema,
  });

  const changeToProfile = () => {
    if (isLoggedIn) {
      //return <Redirect to="/profile" />;
      return navigate("/login");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url('${landing}')`,
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container className="me-25">
          <Row>
            <Col lg="5" md="10" sm="10" className="mx-auto">
              <Card className="mt-5" style={{ opacity: 0.9 }}>
                <Card.Body>
                  <h4>
                    <strong>Iniciar Sesión</strong>
                  </h4>
                  <hr />
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Usuario:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.errors.username && formik.touched.name
                        }
                      ></Form.Control>
                      {formik.errors.username && formik.touched.username ? (
                        <Alert className="mt-3" variant="danger">
                          {formik.errors.username}
                        </Alert>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Contraseña:</Form.Label>
                      <Form.Control
                        type="password"
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
                    <div className="d-flex flex-row-reverse">
                      <Button type="submit" disabled={loading}>
                        {loading && (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        <span>Iniciar Sesión</span>
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5} className="mx-auto">
              <div className="blackBox mt-5">
                <div style={{ padding: "1.5rem" }}>
                  <div className="title">Sistema del EMT</div>
                  <div className="description">
                    El sistema del EMT tiene como propósito la gestión de
                    usuarios y pacientes del proyecto EMT de la Fundación
                    Italocolombiana del Monte Tabor.
                  </div>
                  <div className="description">
                    Para poder iniciar en el sistema, digite sus credenciales de
                    usuario.
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {message && (
            <div className="alert">
              <Row>
                <Col lg="5" md="10" sm="10" className="mx-auto">
                  <Alert variant="danger">{message}</Alert>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Login;
