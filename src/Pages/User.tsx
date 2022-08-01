import { useEffect, useState } from "react";
import  Table from "react-bootstrap/Table";
import  Container from "react-bootstrap/Container";
import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import { deletePoll, getUserPolls, togglePollOpened } from "../services/PollService";
import { List, Share, Trash } from "react-bootstrap-icons";
import Switch from "../Components/UI/Switch";
import ReactPaginate from "react-paginate";
import copy from "copy-to-clipboard";
import { BASE_URL } from "../utils/constants";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { confirmAlert} from "react-confirm-alert";
import { Link } from "react-router-dom";
const User = ()=>{

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [polls, setPolls] = useState<any>([]);
    const [showToast, setShowToast] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);

    //se va a ejecutar lo que está dentro de useEffect cada vez que currentPage cambie
    useEffect(()=>{
        fetchPolls();
    },[currentPage])

    const fetchPolls = async()=>{
        const res: any = await getUserPolls(currentPage);
        setPolls(res.data.polls);
        setTotalRecords(res.data.totalRecords);
        setTotalPages(res.data.totalPages);
    }

    const handlePollToggle = async (id:number)=>{
        const _polls=[...polls] //creamos una copia de polls 
        const poll = _polls.find(poll=>poll.id ===id);
        poll.opened = !poll.opened;
        setPolls(_polls);
        await togglePollOpened(poll.pollId); //hace cambio en la base de datos

    }

    //función que se encarga de resolver cuando se haga un cambio de pagina
    const handlePageChange = (selectedItem: {selected:number})=>{
        setCurrentPage(selectedItem.selected);
    }

    const handleDeletePoll =  (pollId: string)=>{

        confirmAlert({
            customUI: ({onClose})=>{
                return(
                    <div className="custom-ui">
                        <h2>Eliminar encuesta</h2>
                        <p>¿Estás seguro que quieres eliminar esta encuesta?</p>
                        <Button variant="outline-primary" size="sm" className="me-2"
                        onClick={async()=>{
                            await  deletePoll(pollId);
                            //cambiar la currentPage
                            currentPage===0 ?  fetchPolls() : setCurrentPage(0);
                            onClose();
                        }}
                        >Sí, Eliminar!</Button>
                        <Button  variant="outline-primary" size="sm" onClick={onClose} >No</Button>
                    </div>
                );
            }
        })
   

    }

    const renderTable = ()=>{
        return(
        <Table className="mt-4 polls-table" striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Recibir más respuestas</th>
                    <th>Acciones</th>
                </tr>
                
            </thead>

            <tbody>
                    {
                        polls.map((poll:any)=>{
                            return (
                                <tr key={poll.id}>
                                    <td>{poll.content}</td>
                                    <td>
                                        <Switch
                                        label={!!poll.opened ? "Activado" : "Desactivado"}
                                        checked={!!poll.opened}
                                        id={poll.pollId}
                                        onChange={()=>{handlePollToggle(poll.id)}}
                                        ></Switch>
                                    </td>
                                    <td className="polls-table-controls">
                                        <span onClick={()=>{
                                            copy(`${BASE_URL}/replypoll/${poll.pollId}`);
                                            setShowToast(true);
                                        }}><Share></Share></span>
                                        <span><List></List></span>
                                        <span
                                        onClick={()=>handleDeletePoll(poll.pollId)}
                                        ><Trash></Trash></span>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
        </Table>);
    }
    return (
        <Container className="mt-5">
            <Row>
                <Col sm="10" md="10" lg="8" className="mx-auto">
                    <h5>Mis encuestas</h5>
                    {
                        
                        totalRecords >0 && polls ? 
                        <>
                            {renderTable()}
                            <ReactPaginate
                                pageCount={totalPages}
                                forcePage={currentPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                previousLabel={'Anterior'}
                                nextLabel={'Siguiente'}
                                containerClassName="pagination justify-content-end"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                activeClassName="active"
                                breakLabel={'...'}
                                onPageChange={handlePageChange}
                            ></ReactPaginate>
                            <ToastContainer position="bottom-center">
                                <Toast show={showToast }delay={5000} autohide onClose={()=>{setShowToast(false)}}>
                                    <Toast.Header closeButton={false}>Compartido!</Toast.Header>
                                    <Toast.Body>Enlace copiado al portapapeles</Toast.Body>
                                </Toast>
                            </ToastContainer>
                    </>
                    : <span className="d-block mt-5">
                        No tienes ninguna encuestas <Link to="/createpoll">comienza a crear</Link>
                    </span>
                    } 
                    
                </Col>
            </Row>
        </Container>
        );
}
export default User;