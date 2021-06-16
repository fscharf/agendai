import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../../components/Context/AppContext";
import api from "../../../services/api";

export default function Details({
  title,
  size,
  variant,
  actionTitle,
  userKey,
}) {
  const { userClass } = React.useContext(Context);

  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    show: false,
    username: users.username,
    isAdmin: users.isAdmin,
    isActive: users.isActive,
    accountVerified: users.accountVerified,
  });

  const handleClose = () => setState({ show: false });

  const handleShow = () => {
    setState({ show: true });

    api.get(`/users/${userKey}`).then((res) => {
      setUsers(res.data);
    });
  };

  const handleSubmit = () => {
    userClass
      .update({
        key: users.user_id,
        username: state.username,
        isActive: state.isActive,
        isAdmin: state.isAdmin,
        accountVerified: state.accountVerified,
      })
      .then(() => handleClose());
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <Modal show={state.show} onHide={handleClose}>
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
                name="username"
                value={state.username || users.username}
                onChange={handleChange}
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
                name="isAdmin"
                value={state.isAdmin || users.isAdmin}
                onChange={handleChange}
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
                name="isActive"
                value={state.isActive || users.isActive}
                onChange={handleChange}
              >
                <option value={true}>Ativo</option>
                <option value={false}>Inativo</option>
              </select>
            </Col>
          </Form.Row>
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="4">
              Conta verificada
            </Form.Label>
            <Col md="8">
              <select
                className="form-select"
                name="accountVerified"
                value={state.accountVerified || users.accountVerified}
                onChange={handleChange}
              >
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
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
            disabled={
              state.username ||
              state.isAdmin ||
              state.isActive ||
              state.accountVerified
                ? false
                : true
            }
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
