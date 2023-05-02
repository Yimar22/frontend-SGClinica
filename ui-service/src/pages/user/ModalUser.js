import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalUser = ({ show, handleClose, handleDeleteUser, userId }) => {
  const selectedUser = userId;
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>Eliminar usuario</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que quieres eliminar al usuario:{" "}
        <strong>{selectedUser}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleDeleteUser}>
          Sí, eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUser;
