import React, { useContext, useState } from "react";
import { Card, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../components/Context/AppContext";
import NightMode from "../../components/Layout/NightMode";

export default function Index() {
  const { user, userClass } = useContext(Context);

  const [state, setState] = useState({
    username: "",
  });

  const handleUpdate = () => {
    userClass.update({ key: user.user_id, username: state.username });
  };

  return (
    <Card.Body>
      <Card.Title>
        <i className="far fa-user-circle me-2" />
        Conta
      </Card.Title>
      <hr />
      <Card.Text className="text-muted">Dados pessoais</Card.Text>

      <Card.Text className="text-start text-sm-end">
        <Form.Row as={Row} className="mb-3">
          <Form.Label column md="3">
            Nome Completo
          </Form.Label>
          <Col md="7">
            <InputGroup>
              <Form.Control
                type="text"
                onChange={(e) => setState({ username: e.target.value })}
                value={state.username || user.username}
              />
              {state.username && state.username !== user.username && (
                <Button title="Salvar" onClick={() => handleUpdate()}>
                  <i className="far fa-save" />
                </Button>
              )}
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Row as={Row} className="mb-3">
          <Form.Label column md="3">
            Email
          </Form.Label>
          <Col md="7">
            <InputGroup>
              <Form.Control disabled type="text" value={user.email} />
              <Link
                to="/account/change-email"
                title="Alterar"
                className="btn btn-primary"
              >
                <i className="far fa-edit" />
              </Link>
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Row as={Row} className="mb-3">
          <Form.Label column md="3">
            Senha
          </Form.Label>
          <Col md="7">
            <InputGroup>
              <Form.Control disabled type="text" value={"**********"} />
              <Link
                to="/account/change-password"
                title="Alterar"
                className="btn btn-primary"
              >
                <i className="far fa-edit" />
              </Link>
            </InputGroup>
          </Col>
        </Form.Row>
      </Card.Text>
      <hr />
      <Card.Text className="text-muted">Opções</Card.Text>
      <Card.Text className="text-start text-sm-end">
        <Form.Row className="mb-3">
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="3">
              Tema
            </Form.Label>
            <Col md="7 text-start">
              <NightMode />
            </Col>
          </Form.Row>
        </Form.Row>
      </Card.Text>
      <hr />
      <Card.Text className="text-danger">Área de risco</Card.Text>
      <Card.Text className="text-start text-sm-end">
        <Form.Row className="mb-3">
          <Form.Row as={Row} className="mb-3">
            <Col md="3" />
            <Col md="7 text-start">
              <Button variant="danger" disabled>
                <i className="far fa-user-lock me-2" />
                Desativar conta
              </Button>
            </Col>
          </Form.Row>
        </Form.Row>
      </Card.Text>
    </Card.Body>
  );
}
