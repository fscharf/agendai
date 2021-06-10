import React from "react";
import { Button, Modal } from "react-bootstrap";
// import { Context } from "../../../components/Context/AppContext";
import api from "../../../services/api";

export default function Details({
  onClick,
  title,
  size,
  variant,
  actionTitle,
  userKey,
}) {
  const [show, setShow] = React.useState(false);
  const [users, setUsers] = React.useState([]);
//   const { userClass } = React.useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);

    api
      .get(`/users/${userKey}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err.response.data.message));
  };

  //tentar .then(() => props)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <span>
            <i className="far fa-pen me-2" />
            Editar: {users.username}
          </span>
        </Modal.Header>

        <Modal.Body></Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>
          <Button>
            <i className="fas fa-save me-2" />
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Button title={title} size={size} variant={variant} onClick={handleShow}>
        {actionTitle}
      </Button>
    </>
  );
}
