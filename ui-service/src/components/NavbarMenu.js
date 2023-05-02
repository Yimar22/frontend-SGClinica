import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { SidebarData } from "./SidebarData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { logout } from "../slices/auth";
import EventBus from "../common/EventBus";
import { Button } from "react-bootstrap";
import emtImage from "../img/emt.png";

function NavbarC() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    navigate("/login");
    dispatch(logout());
  }, [dispatch, navigate]);
  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, dispatch, logOut]);

  const verify = (arrayRolesItem) => {
    for (const roles of currentUser.authorities) {
      const exist = arrayRolesItem.includes(roles.authority);
      if (!exist) continue;
      return true;
    }
  };
  return (
    <>
      <Navbar
        key={false}
        bg="light"
        expand={false}
        className="mb-3 navbarcolor"
      >
        <Container fluid>
          <Navbar.Brand href="/home" placement="start">
            <img src={emtImage} className="emtImg" alt="emt" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${false}`}
                className="text-primary"
              >
                <strong>SISTEMA DEL EMT</strong>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {SidebarData.map((item) => {
                  if (
                    currentUser &&
                    item.title !== "Iniciar Sesión" &&
                    item.title !== "Cerrar Sesión" &&
                    item.subNav &&
                    verify(item.roles)
                  ) {
                    return (
                      <NavDropdown
                        className="my-navbar"
                        title={item.title}
                        id={`offcanvasNavbarDropdown-expand-${false}`}
                        key={item.title}
                      >
                        {item.subNav.map((itemsubnav) => {
                          if (verify(itemsubnav.roles)) {
                            return (
                              <NavDropdown.Item
                                href={itemsubnav.path}
                                key={itemsubnav.title}
                              >
                                {itemsubnav.title}
                              </NavDropdown.Item>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </NavDropdown>
                    );
                  } else if (
                    item.title !== "Iniciar Sesión" &&
                    item.title !== "Cerrar Sesión" &&
                    currentUser &&
                    !item.subNav &&
                    verify(item.roles)
                  ) {
                    return (
                      <Nav.Link
                        className="my-navbar-link"
                        href={item.path}
                        key={item.title}
                      >
                        {item.title}
                      </Nav.Link>
                    );
                  } else if (currentUser && item.title === "Cerrar Sesión") {
                    return (
                      <Button
                        className="mx-2"
                        variant="outline-dark"
                        size="sm"
                        onClick={logOut}
                        key={item.title}
                      >
                        {item.title}
                      </Button>
                    );
                  } else {
                    return null;
                  }
                })}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarC;
