import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllClinicHistoryFormats } from "../../../slices/clinicHistory";
import { clearMessage } from "../../../slices/message";

import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ReactTooltip from "react-tooltip";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ClinicHistoryView = () => {
  const { clinicHistoryFormats } = useSelector((state) => state.clinicHistory);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(getAllClinicHistoryFormats());
  }, [dispatch]);

  const fetchClinicHistory = (id) => {
    navigate(`/clinicHistory/clinicHistoryDetails/${id}`);
  };

  const formatCreationDate = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Container>
        <Row>
          <Col>
            {new Date(row.createdAt).toLocaleString("default", {
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
  const formatState = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Container>
        <Row>
          <Col>{row.enabled === true ? "Activo" : "Inactivo"}</Col>
        </Row>
      </Container>
    );
  };
  const actionsButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Container>
        <Row className="users-table-controls">
          <Col lg={6} md={12} sm={12}>
            <span
              data-tip="Visualizar formato"
              onClick={() => {
                fetchClinicHistory(row.id);
              }}
            >
              <RiIcons.RiSearchLine></RiIcons.RiSearchLine>
            </span>
          </Col>
          <Col lg={3} md={12} sm={12}>
            <span data-tip="Editar estado del modelo" onClick={() => {}}>
              <FiIcons.FiEdit></FiIcons.FiEdit>
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
      text: "Identificador",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por identificador",
      }),
      headerClasses: "table-column",
      headerAlign: "center",
    },
    {
      dataField: "name",
      text: "Nombre del formato",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por nombre del formato",
      }),
      headerClasses: "table-column",
      headerAlign: "center",
    },
    {
      dataField: "description",
      text: "Descripción del formato",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por descripción del formato",
      }),
    },
    {
      dataField: "enabled",
      text: "Estado del formato",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por estado",
      }),
      headerClasses: "table-column",
      formatter: formatState,
    },
    {
      dataField: "createdAt",
      text: "Fecha de creación",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por fecha de creación",
      }),
      headerClasses: "table-column",
      formatter: formatCreationDate,
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
          data={clinicHistoryFormats}
          pagination={pagination}
          filter={filterFactory()}
        ></BootstrapTable>
      </>
    );
  };
  return (
    <>
      <Container className="mb-10 mt-5">
        {clinicHistoryFormats.length ? (
          <Row>
            <Col sm="10" md="10" lg="10" className="mx-auto">
              <h2 className="text-center text-primary">
                <strong>Formatos de Historias Clínicas del EMT</strong>
              </h2>
              <hr />
              {renderTable()}
            </Col>
          </Row>
        ) : (
          <h6>No hay ningún formato</h6>
        )}
      </Container>
    </>
  );
};

export default ClinicHistoryView;
