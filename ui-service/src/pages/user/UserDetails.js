import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByUsername,
  getUserPersonalInformation,
} from "../../slices/user";
import { clearMessage } from "../../slices/message";
import UserService from "../../services/user.service";
import UserDetailsContactInformation from "./UserDetailsContactInformation";
import UserDetailsPersonalInformation from "./UserDetailsPersonalInformation";
import UserDetailsRoles from "./UserDetailsRoles";
import UserDetailsStatus from "./UserDetailsStatus";
const UserDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const username = params.userId;
  const [roles, setRoles] = useState([]);
  const { loading, user, userPersonalInformation } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getAllRoles().then((data) => {
      setRoles(data);
    });
    dispatch(getUserByUsername(username));
    dispatch(getUserPersonalInformation(username));
    dispatch(clearMessage());
  }, [username, setRoles, dispatch]);
  return (
    <Container className="mt-5">
      {!loading ? (
        <Row>
          <Col lg="10" md="10" sm="10" className="mx-auto">
            <Card className="mb-5 shadow-lg p-1">
              <Card.Body>
                <Card.Title>
                  <h3>
                    <strong>Información del Usuario: {username}</strong>
                  </h3>
                  <hr />
                </Card.Title>
                <Tabs
                  defaultActiveKey="personalInformation"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab
                    eventKey="personalInformation"
                    title="Información Personal"
                  >
                    <UserDetailsPersonalInformation
                      user={user}
                      userPersonalInformation={userPersonalInformation}
                    />
                  </Tab>
                  <Tab
                    eventKey="contactInformation"
                    title="Información de Contacto"
                  >
                    <UserDetailsContactInformation
                      user={user}
                      roles={roles}
                      userPersonalInformation={userPersonalInformation}
                    />
                  </Tab>
                  <Tab eventKey="roles" title="Roles">
                    <UserDetailsRoles user={user} roles={roles} />
                  </Tab>
                  <Tab eventKey="status" title="Estado del Usuario">
                    <UserDetailsStatus user={user} roles={roles} />
                  </Tab>
                </Tabs>
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
        <Row>
          <Col lg="10" md="10" sm="10" className="mx-auto">
            <Card className="mt-5 mb-5 shadow-lg p-1">
              <Card.Body>
                <Card.Title>
                  <h3>
                    <strong>Cargando información del usuario</strong>
                  </h3>
                </Card.Title>
                <hr />
                <Card></Card>
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
    </Container>
  );
};

export default UserDetails;
