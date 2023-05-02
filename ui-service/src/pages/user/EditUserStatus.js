import React from "react";
import { Button, Card } from "react-bootstrap";
import UserService from "../../services/user.service";

const EditUserStatus = ({ user }) => {
  const actualUser = user;

  const handleEditInformation = () => {
    UserService.editUserStatus(
      actualUser.username,
      !actualUser.accountStatus
    ).then(() => {
      window.location.reload();
    });
  };
  return (
    <>
      <Card>
        <Card.Title className="ms-4 mt-4">
          <h4>
            <strong>
              Información del estado del usuario {actualUser.username}
            </strong>
          </h4>
        </Card.Title>
        <Card.Body className="ms-2">
          <h5>
            <strong>Estado actual del usuario: {actualUser.username}</strong>.
          </h5>
          {actualUser.accountStatus ? (
            <h6>
              Actualmente el usuario se encuentra <strong>activo</strong>.
            </h6>
          ) : (
            <h6>
              Actualmente el usuario se encuentra <strong>inactivo</strong>
            </h6>
          )}
          <div className="d-flex flex-row-reverse">
            <Button variant="outline-primary" onClick={handleEditInformation}>
              {actualUser.accountStatus
                ? "Desactivar cuenta"
                : "Activar cuenta"}
            </Button>
          </div>

          <hr />
        </Card.Body>
      </Card>
    </>
  );
};

export default EditUserStatus;
