import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/authContext";

//MENÚ DE NAVEGACIÓN
const Navigation = ()=>{
    //nos traemos el usuario
    const user= useAuthState();
    const authDispatch = useAuthDispatch();

    const logout = ()=>{
        authDispatch({
            type:"logout"
        })
    }

    return(

        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Encuesta</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar"></Navbar.Toggle>
                <Navbar.Collapse id="navbar">
                    <Nav className="me-auto"></Nav>
                    <Nav className="justify-content-end">
                       {user.isAuthenticated ? 
                       <>
                            <Nav.Link as={Link} to="/createpoll">Crear encuestas</Nav.Link>
                            <NavDropdown title={user.email} id="navbar-dropdown">
                                    <NavDropdown.Item as={Link} to="/user">Mis encuestas</NavDropdown.Item>
                                    <NavDropdown.Divider></NavDropdown.Divider>
                                    <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
                            </NavDropdown>
                       </>
                        : 
                       <>
                            <Nav.Link as={Link} to="/">Iniciar Sesión</Nav.Link>
                            <Nav.Link as={Link} to="/register">Crear Cuenta</Nav.Link>
                       </>
                       
                       }
                       

                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>

    )

}
export default Navigation;