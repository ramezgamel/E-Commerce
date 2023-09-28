/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";

function Model({ children, show, handleClose, header }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default Model;
