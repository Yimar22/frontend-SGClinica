import React from "react";
import { Card } from "react-bootstrap";

const UserDetailsStatus = ({ user }) => {
  const actualUser = user;
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
        </Card.Body>
      </Card>
    </>
  );
};

export default UserDetailsStatus;
