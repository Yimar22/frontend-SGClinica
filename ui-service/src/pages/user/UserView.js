import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../slices/user";
import { clearMessage } from "../../slices/message";

import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import ModalUser from "./ModalUser";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import ReactTooltip from "react-tooltip";

const UserView = () => {
  const { usersApp } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(getAllUsers());
  }, [dispatch]);
  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteUser = () => {
    UserService.deleteUserByUsername(selectedUser.username).then(() => {
      window.location.reload();
    });
  };

  const handleShow = (username) => {
    setShow(true);
    setUserId(username);
    UserService.getUserByUsername(username).then((data) => {
      setSelectedUser(data);
    });
  };

  const handleChangePassword = (username) => {
    navigate(`/users/recoverPassword/${username}`);
  };

  const handleEditUser = (username) => {
    navigate(`/users/editUser/${username}`);
  };

  const handleViewUser = (username) => {
    navigate(`/users/userDetails/${username}`);
  };

  const actionsButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Container>
        <Row className="users-table-controls">
          <Col lg={3} md={12} sm={12}>
            <span
              data-tip="Ver información del usuario"
              onClick={() => {
                handleViewUser(row.username);
              }}
            >
              <RiIcons.RiSearchLine></RiIcons.RiSearchLine>
            </span>
          </Col>
          <Col lg={3} md={12} sm={12}>
            <span
              data-tip="Editar usuario"
              onClick={() => {
                handleEditUser(row.username);
              }}
            >
              <FiIcons.FiEdit></FiIcons.FiEdit>
            </span>
          </Col>
          <Col lg={3} md={12} sm={12}>
            <span
              data-tip="Cambiar contraseña a usuario"
              onClick={() => handleChangePassword(row.username)}
            >
              <RiIcons.RiLockPasswordLine></RiIcons.RiLockPasswordLine>
            </span>
          </Col>
          <Col lg={3} md={12} sm={12}>
            <span
              data-tip="Eliminar usuario"
              onClick={() => handleShow(row.username)}
            >
              <Trash></Trash>
            </span>
          </Col>
        </Row>
        <ReactTooltip place="left" effect="solid" />
      </Container>
    );
  };
  const userStateToggle = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Container>
        <Row>
          <Col>{row.accountStatus}</Col>
        </Row>
      </Container>
    );
  };
  const userBirthdateFormat = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Container>
        <Row>
          <Col>
            {new Date(row.last_login).toLocaleString("default", {
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
  const columns = [
    {
      dataField: "username",
      text: "Usuario",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por usuario",
      }),
      headerClasses: "table-column",
      headerAlign: "center",
    },
    {
      dataField: "fullName",
      text: "Nombre completo",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por nombre completo",
      }),
      headerClasses: "table-column",
      headerAlign: "center",
    },
    {
      dataField: "last_login",
      text: "Última sesión",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por último inicio de sesión",
      }),
      headerClasses: "table-column",
      formatter: userBirthdateFormat,
    },
    {
      dataField: "accountStatus",
      text: "Estado del usuario",
      sort: true,
      filter: textFilter({
        placeholder: "Buscar por estado",
        delay: 0,
      }),
      headerClasses: "table-column",
      formatter: userStateToggle,
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

  // const defaultSorted = [
  //   {
  //     dataField: "username",
  //     order: "desc",
  //   },
  // ];
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
          keyField="username"
          columns={columns}
          data={usersApp}
          pagination={pagination}
          filter={filterFactory()}
        ></BootstrapTable>
      </>
    );
  };
  return (
    <>
      <Container className="mb-10 mt-5">
        {usersApp.length ? (
          <Row>
            <Col sm="10" md="10" lg="10" className="mx-auto">
              <h2 className="text-center text-primary">
                <strong>Usuarios del EMT</strong>
              </h2>
              <hr />
              {renderTable()}
            </Col>
          </Row>
        ) : (
          <h6>No hay ningún usuario</h6>
        )}
      </Container>
      <ModalUser
        show={show}
        handleClose={() => handleClose()}
        handleDeleteUser={() => handleDeleteUser()}
        userId={userId}
      />
    </>
  );
};

export default UserView;
