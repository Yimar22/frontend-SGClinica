import React, { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import UserService from "../../services/user.service";

const EditUserContactInformation = ({ user, userPersonalInformation }) => {
  const actualUser = user;
  const currentUserPersonalInformation = userPersonalInformation;
  const [editText, setEditText] = useState(true);
  const [isDisabled, setIsDisable] = useState(true);
  const [phoneNumberEdit, setPhoneNumberEdit] = useState();
  const [emailEdit, setEmailEdit] = useState();
  const [addressEdit, setAddressEdit] = useState();
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validAddress, setValidAddress] = useState(true);

  const handleEditInformation = () => {
    setPhoneNumberEdit(currentUserPersonalInformation.phoneNumber);
    setEmailEdit(currentUserPersonalInformation.email);
    setAddressEdit(currentUserPersonalInformation.address);
    setEditText(!editText);
    setIsDisable(!isDisabled);
  };
  const verifyInputFormatValues = () => {
    if (phoneNumberEdit.lenght === 0) {
      setValidPhoneNumber(false);
      return false;
    } else {
      setValidPhoneNumber(true);
    }
    if (emailEdit.lenght === 0) {
      setValidEmail(false);
      return false;
    } else {
      setValidEmail(true);
    }
    if (addressEdit.lenght === 0) {
      setValidAddress(false);
      return false;
    } else {
      setValidAddress(true);
    }
    return true;
  };

  const handleUpdateInformation = () => {
    if (verifyInputFormatValues()) {
      UserService.updateUserPersonalInformation(
        currentUserPersonalInformation.id,
        currentUserPersonalInformation.firstName,
        currentUserPersonalInformation.lastName,
        emailEdit,
        currentUserPersonalInformation.birthDate,
        currentUserPersonalInformation.gender.id,
        currentUserPersonalInformation.civilStatus.id,
        phoneNumberEdit,
        addressEdit
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
              Información de contacto del usuario {actualUser.username}
            </strong>
          </h4>
        </Card.Title>
        <Card.Body className="ms-2">
          <h5>
            <strong>Información de contacto:</strong>
          </h5>
          <Form>
            <Row className="pb-2">
              <Col lg={6} md={12} sm={12}>
                <Form.Group controlId="phone">
                  <Form.Label>
                    <strong>Teléfono:</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name=""
                    value={
                      isDisabled
                        ? currentUserPersonalInformation.phoneNumber
                        : phoneNumberEdit
                    }
                    disabled={isDisabled}
                    onChange={(e) => setPhoneNumberEdit(e.target.value)}
                  />
                </Form.Group>
                {!validPhoneNumber && (
                  <Col lg="12" md="12" sm="12" className="mx-auto">
                    <Alert variant="danger">Este campo es requerido</Alert>
                  </Col>
                )}
              </Col>
              <Col lg={6} md={12} sm={12}>
                <Form.Group controlId="email">
                  <Form.Label>
                    <strong>Correo electrónico:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name=""
                    value={
                      isDisabled
                        ? currentUserPersonalInformation.email
                        : emailEdit
                    }
                    disabled={isDisabled}
                    onChange={(e) => setEmailEdit(e.target.value)}
                  />
                </Form.Group>
                {!validEmail && (
                  <Col lg="12" md="12" sm="12" className="mx-auto">
                    <Alert variant="danger">Este campo es requerido</Alert>
                  </Col>
                )}
              </Col>
            </Row>
            <Row className="pb-2">
              <Col lg={6} md={12} sm={12}>
                <Form.Group controlId="address">
                  <Form.Label>
                    <strong>Dirección:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name=""
                    value={
                      isDisabled
                        ? currentUserPersonalInformation.address
                        : addressEdit
                    }
                    disabled={isDisabled}
                    onChange={(e) => setAddressEdit(e.target.value)}
                  />
                </Form.Group>
                {!validAddress && (
                  <Col lg="12" md="12" sm="12" className="mx-auto">
                    <Alert variant="danger">Este campo es requerido</Alert>
                  </Col>
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

export default EditUserContactInformation;
