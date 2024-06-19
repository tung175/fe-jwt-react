import { Button, Modal } from "react-bootstrap";

const ModalDelete = (props) => {
    const {show, handleClose, dataModal, confirmDeleteUser} = props
    
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this user: {dataModal.email}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={confirmDeleteUser}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
