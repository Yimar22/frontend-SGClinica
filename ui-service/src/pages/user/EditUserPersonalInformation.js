import React, { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import userData from "../../utils/UserData";
import UserService from "../../services/user.service";
const EditUserPersonalInformation = ({ user, userPersonalInformation }) => {
  const actualUser = user;
  const currentUserPersonalInformation = userPersonalInformation;
  const [isDisabled, setIsDisable] = useState(true);
  const [firstNameEdit, setFirstNameEdit] = useState();
  const [lastNameEdit, setLastNameEdit] = useState();
  const [idEdit, setIdEdit] = useState();
  const [genreIdEdit, setGenreIdEdit] = useState();
  const [statusIdEdit, setStatusIdEdit] = useState();
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validId, setValidId] = useState(true);
  const handleEditInformation = () => {
    setFirstNameEdit(currentUserPersonalInformation.firstName);
    setLastNameEdit(currentUserPersonalInformation.lastName);
    setIdEdit(currentUserPersonalInformation.id);
    setGenreIdEdit(currentUserPersonalInformation.gender.id);
    setStatusIdEdit(currentUserPersonalInformation.civilStatus.id);
    setIsDisable(!isDisabled);
  };

  const verifyInputFormatValues = () => {
    if (firstNameEdit.length === 0) {
      setValidFirstName(false);
      return false;
    } else {
      setValidFirstName(true);
    }
    if (lastNameEdit.length === 0) {
      setValidLastName(false);
      return false;
    } else {
      setValidLastName(true);
    }

    if (idEdit === 0) {
      setValidId(false);
      return false;
    } else {
      setValidId(true);
    }
    return true;
  };
  const handleUpdateInformation = () => {
    if (verifyInputFormatValues()) {
      UserService.updateUserPersonalInformation(
        idEdit,
        firstNameEdit,
        lastNameEdit,
        currentUserPersonalInformation.email,
        currentUserPersonalInformation.birthDate,
        genreIdEdit,
        statusIdEdit,
        currentUserPersonalInformation.phoneNumber,
        currentUserPersonalInformation.address
      ).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <>
      <Card>
        <Card.Title className="ms-4 mt-4">
          <h4>
            <strong>
              Información básica del usuario {actualUser.username}
            </strong>
          </h4>
        </Card.Title>
        <Card.Body className="ms-2">
          <h5>
            <strong>Información personal:</strong>
          </h5>
          <Form>
            <Row className="py-2">
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>
                    <strong>Nombre:</strong>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    value={
                      isDisabled
                        ? currentUserPersonalInformation.firstName
                        : firstNameEdit
                    }
                    disabled={isDisabled}
                    onChange={(e) => setFirstNameEdit(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                {!validFirstName && (
                  <Col lg="12" md="12" sm="12" className="mx-auto">
                    <Alert variant="danger">Este campo es requerido</Alert>
                  </Col>
                )}
              </Col>

              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>
                    <strong>Apellido:</strong>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    value={
                      isDisabled
                        ? currentUserPersonalInformation.lastName
                        : lastNameEdit
                    }
                    disabled={isDisabled}
                    onChange={(e) => setLastNameEdit(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                {!validLastName && (
                  <Col lg="12" md="12" sm="12" className="mx-auto">
                    <Alert variant="danger">Este campo es requerido</Alert>
                  </Col>
                )}
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
                    value={currentUserPersonalInformation.id}
                    disabled={true}
                    onChange={(e) => setIdEdit(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                {!validId && (
                  <Col lg="12" md="12" sm="12" className="mx-auto">
                    <Alert variant="danger">Este campo es requerido</Alert>
                  </Col>
                )}
              </Col>
              <Col lg={6} md={12} sm={12}>
                <Form.Label>
                  <strong>Fecha de nacimiento:</strong>
                </Form.Label>
                <Form.Group controlId="dob">
                  <Form.Control
                    type="text"
                    name=""
                    value={new Date(
                      currentUserPersonalInformation.birthDate
                    ).toLocaleDateString()}
                    disabled={true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="pb-2">
              <Col lg={6} md={12} sm={12}>
                <Form.Label>
                  <strong>Género:</strong>
                </Form.Label>
                {isDisabled ? (
                  <Form.Group controlId="genre">
                    <Form.Control
                      type="text"
                      name=""
                      value={currentUserPersonalInformation.gender.name}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                ) : (
                  <Form.Group controlId="genre">
                    <Form.Select
                      name="genre.value"
                      onChange={(e) => setGenreIdEdit(e.target.value)}
                    >
                      <option value={currentUserPersonalInformation.gender.id}>
                        {currentUserPersonalInformation.gender.name}
                      </option>

                      {userData.gender.map((status, index) => {
                        if (
                          status.value ===
                          currentUserPersonalInformation.gender.id
                        ) {
                          return null;
                        } else {
                          return (
                            <option key={index} value={status.value}>
                              {status.name}
                            </option>
                          );
                        }
                      })}
                    </Form.Select>
                  </Form.Group>
                )}
              </Col>
              <Col lg={6} md={12} sm={12}>
                <Form.Label>
                  <strong>Estado Civil:</strong>
                </Form.Label>
                {isDisabled ? (
                  <Form.Group controlId="civilStatus">
                    <Form.Control
                      type="text"
                      name=""
                      value={currentUserPersonalInformation.civilStatus.name}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                ) : (
                  <Form.Group controlId="civilStatus">
                    <Form.Select
                      name="civilStatus.value"
                      onChange={(e) => setStatusIdEdit(e.target.value)}
                    >
                      <option
                        value={currentUserPersonalInformation.civilStatus.id}
                      >
                        {currentUserPersonalInformation.civilStatus.name}
                      </option>

                      {userData.civilStatus.map((status, index) => {
                        if (
                          status.value ===
                          currentUserPersonalInformation.civilStatus.id
                        ) {
                          return null;
                        } else {
                          return (
                            <option key={index} value={status.value}>
                              {status.name}
                            </option>
                          );
                        }
                      })}
                    </Form.Select>
                  </Form.Group>
                )}
              </Col>
            </Row>
            <hr />
            <div className="d-flex flex-row-reverse">
              {isDisabled ? (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    handleEditInformation();
                  }}
                >
                  Editar
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    handleUpdateInformation();
                  }}
                >
                  Guardar Cambios
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditUserPersonalInformation;
