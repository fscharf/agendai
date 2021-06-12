import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../../components/Context/AppContext";
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
  const [name, setName] = React.useState(users.username);
  const [isAdmin, setAdmin] = React.useState(users.isAdmin);
  const [isActive, setActive] = React.useState(users.isActive);

  const { userClass } = React.useContext(Context);

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

  const handleSubmit = () => {
    userClass.handleUpdate({
      key: users.user_id,
      username: name,
      isActive: isActive,
      isAdmin: isAdmin,
    });
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

        <Modal.Body>
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="4">
              Nome Completo
            </Form.Label>
            <Col md="8">
              <Form.Control
                type="text"
                value={name || users.username}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Row>
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="4">
              E-mail
            </Form.Label>
            <Col md="8">
              <Form.Control type="text" readOnly value={users.email} />
            </Col>
          </Form.Row>
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="4">
              Tipo
            </Form.Label>
            <Col md="8">
              <select
                className="form-select"
                value={isAdmin || users.isAdmin}
                onChange={(e) => setAdmin(e.target.value)}
              >
                <option value={true}>Administrador</option>
                <option value={false}>Normal</option>
              </select>
            </Col>
          </Form.Row>
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="4">
              Status
            </Form.Label>
            <Col md="8">
              <select
                className="form-select"
                value={isActive || users.isActive}
                onChange={(e) => setActive(e.target.value)}
              >
                <option value={true}>Ativo</option>
                <option value={false}>Inativo</option>
              </select>
            </Col>
          </Form.Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={name || isAdmin || isActive ? false : true}
          >
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
