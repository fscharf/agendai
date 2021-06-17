import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmationToast({
  onClick,
  message,
  actionTitle,
  ...rest
}) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <h5>Atenção</h5>
          <button onClick={handleClose} className="btn-close" />
        </Modal.Header>
        <Modal.Body className="text-center">
          {message ? message : "Tem certeza que deseja continuar?"}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>
          <Button onClick={onClick} onChange={handleClose}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Button {...rest} onClick={handleShow}>
        {actionTitle}
      </Button>
    </>
  );
}
