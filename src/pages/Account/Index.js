import React, { useContext, useEffect, useState } from "react";
import { Card, Form, Row, Col, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../components/Context/AppContext";

export default function Index() {
  const { user, userClass } = useContext(Context);

  const [state, setState] = useState({
    username: "",
  });

  useEffect(() => {}, []);

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
            <Form.Control
              type="text"
              onChange={(e) => setState({ username: e.target.value })}
              value={state.username || user.username}
            />
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
                title="Alterar e-mail"
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
                title="Alterar senha"
                className="btn btn-primary"
              >
                <i className="far fa-edit" />
              </Link>
            </InputGroup>
          </Col>
        </Form.Row>
      </Card.Text>
      <hr/>
      <Card.Text className="text-muted">
          Opções
      </Card.Text>
    </Card.Body>
  );
}
