import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
const UserDetailsRoles = ({ user, roles }) => {
  const actualUser = user;
  const theroles = roles;

  const rolesName = (rolesObject) => {
    let rolesarray = [];
    for (const element of rolesObject) {
      rolesarray.push(element.name);
    }
    return rolesarray;
  };
  const findRolesInCommon = (rolesApp, rolesUser) => {
    return rolesApp.filter((role) => rolesUser.includes(role));
  };
  return (
    <Card>
      <Card.Title className="ms-4 mt-4">
        <h4>
          <strong>
            Información sobre los roles del usuario {actualUser.username}
          </strong>
        </h4>
      </Card.Title>
      <Card.Body className="ms-2">
        <h5>
          <strong>Roles del usuario:</strong>
        </h5>
        {user.roles.length !== 0 ? (
          <Form.Group>
            <Row>
              {findRolesInCommon(
                rolesName(theroles),
                rolesName(actualUser.roles)
              ).map((role) => (
                <Col className="mx-2" lg={12} sm={12} md={12} key={role}>
                  <Form.Check
                    type="checkbox"
                    className="mx-2"
                    name="userRoles"
                    value={role}
                    label={role}
                    defaultChecked={true}
                    disabled={true}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
        ) : (
          <div>
            <h6>Este usuario no tiene roles asociados</h6>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserDetailsRoles;
