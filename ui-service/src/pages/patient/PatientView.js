import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../slices/message";
import { getAllPatients } from "../../slices/patient";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { Col, Container, Row } from "react-bootstrap";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";
import * as CgIcons from "react-icons/cg";
import ReactTooltip from "react-tooltip";
import { useNavigate } from "react-router-dom";

const PatientView = () => {
  const { patients } = useSelector((state) => state.patient);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(getAllPatients());
  }, [dispatch]);

  const handleViewPatient = (patientId) => {
    navigate(`/patients/patientDetails/${patientId}`);
  };

  const handlePatientClinicHistory = (patientId) => {
    navigate(`/patients/patientClinicHistory/${patientId}`);
  };
  const patientCreationDateFormat = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Container>
        <Row>
          <Col>
            {new Date(row.creationDate).toLocaleString("default", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour12: false,
            })}
          </Col>
        </Row>
      </Container>
    );
  };
  const actionsButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Container>
        <Row className="users-table-controls">
          <Col lg={4} md={12} sm={12}>
            <span
              data-tip="Ver información del paciente"
              onClick={() => {
                handleViewPatient(row.id);
              }}
            >
              <RiIcons.RiSearchLine></RiIcons.RiSearchLine>
            </span>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <span data-tip="Editar información del paciente" onClick={() => {}}>
              <FiIcons.FiEdit></FiIcons.FiEdit>
            </span>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <span
              data-tip="Historia clínica del paciente"
              onClick={() => {
                handlePatientClinicHistory(row.id);
              }}
            >
              <CgIcons.CgFileDocument></CgIcons.CgFileDocument>
            </span>
          </Col>
        </Row>
        <ReactTooltip place="left" effect="solid" />
      </Container>
    );
  };
  const columns = [
    {
      dataField: "id",
      text: "Número de identificación",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por número de identificación",
      }),
      headerClasses: "table-column",
      headerAlign: "center",
    },
    {
      dataField: "creationDate",
      text: "Fecha de creación",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por fecha de creación",
      }),
      headerClasses: "table-column",
      formatter: patientCreationDateFormat,
    },
    {
      dataField: "personalInformation.firstName",
      text: "Nombre",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por nombre",
      }),
      headerClasses: "table-column",
      headerAlign: "center",
    },
    {
      dataField: "personalInformation.lastName",
      text: "Apellido",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por apellido",
      }),
      headerClasses: "table-column",
      headerAlign: "center",
    },
    {
      dataField: "actions",
      text: "Acciones",
      formatter: actionsButtons,
      headerClasses: "table-column",
    },
  ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    sizePerPageList: [5, 10, 15],
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {},
    onSizePerPageChange: function (page, sizePerPage) {},
  });

  const renderTable = () => {
    return (
      <>
        <BootstrapTable
          className="mt-4 users-table text-center"
          bordered={true}
          responsive
          striped
          hover
          bootstrap4
          keyField="id"
          columns={columns}
          data={patients}
          pagination={pagination}
          filter={filterFactory()}
        ></BootstrapTable>
      </>
    );
  };

  return (
    <>
      <Container className="mb-10 mt-5">
        {patients.length ? (
          <Row>
            <Col sm="10" md="10" lg="10" className="mx-auto">
              <h2 className="text-center text-primary">
                <strong>Pacientes del EMT</strong>
              </h2>
              <hr />
              {renderTable()}
            </Col>
          </Row>
        ) : (
          <h6>No hay ningún paciente</h6>
        )}
      </Container>
    </>
  );
};

export default PatientView;
