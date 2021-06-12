import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmationToast({
  onClick,
  title,
  size,
  variant,
  actionTitle,
}) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Tem certeza que deseja continuar?</Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>
          <Button onClick={onClick} onChange={handleClose}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Button title={title} size={size} variant={variant} onClick={handleShow}>
        {actionTitle}
      </Button>
    </>
  );
}
