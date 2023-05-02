import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearMessage } from "../../slices/message";
import * as Yup from "yup";
import { changePassword } from "../../slices/user";
import { useFormik } from "formik";
const UserRecoverPassword = () => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const username = params.userId;
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  function equalTo(ref, msg) {
    return Yup.mixed().test({
      name: "equalTo",
      exclusive: false,
      message: msg,
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }
  Yup.addMethod(Yup.string, "equalTo", equalTo);

  const initialValues = {
    newPassword: "",
    passwordConfirm: "",
  };
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required("Este campo es requerido."),
    passwordConfirm: Yup.string()
      .equalTo(Yup.ref("newPassword"), "Las contraseñas no coinciden")
      .required("Este campo es requerido."),
  });

  const handleChangePassword = (formValue) => {
    const { newPassword } = formValue;
    setLoading(true);
    setSuccessful(false);
    dispatch(changePassword({ username, newPassword }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setSuccessful(false);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleChangePassword,
    validationSchema,
  });

  return (
    <Container className="me-25 mb-5">
      {/* {!successful && ( */}
      {!successful ? (
        <Row>
          <Col lg="5" md="10" sm="10" className="mx-auto">
            <Card className="mt-5 mb-5 shadow-lg p-1">
              <Card.Body>
                <Card.Title>
                  <h4 className="text-center">
                    <strong>Cambiar Contraseña del usuario {username}</strong>
                  </h4>
                </Card.Title>

                <hr />
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>
                      <strong>Usuario:</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      disabled={true}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>
                      <strong>Nueva Contraseña:</strong>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.errors.newPassword && formik.touched.newPassword
                      }
                    ></Form.Control>
                    {formik.errors.newPassword && formik.touched.newPassword ? (
                      <Alert className="mt-3" variant="danger">
                        {formik.errors.newPassword}
                      </Alert>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="passwordConfirm">
                    <Form.Label>
                      <strong>Confirmar Contraseña:</strong>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={formik.values.passwordConfirm}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.errors.passwordConfirm &&
                        formik.touched.passwordConfirm
                      }
                    ></Form.Control>
                    {formik.errors.passwordConfirm &&
                    formik.touched.passwordConfirm ? (
                      <Alert className="mt-3" variant="danger">
                        {formik.errors.passwordConfirm}
                      </Alert>
                    ) : null}
                  </Form.Group>

                  <div className="d-flex flex-row-reverse">
                    <Button type="submit" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border sm"></span>
                      )}
                      <span>Cambiar contraseña</span>
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
      ) : (
        <div className="alert">
          <Row>
            <Col lg="10" md="10" sm="10" className="mx-auto">
              <Alert variant="success">
                La contraseña del usuario {username} ha sido cambiada
                exitosamente!
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
            <Col lg="5" md="10" sm="10" className="mx-auto">
              <Alert variant="danger">{message}</Alert>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default UserRecoverPassword;
