import React, { useContext, useState } from "react";
import { Context } from "../../components/Context/AppContext";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";

export default function Account() {
  const { user, userClass, loading } = useContext(Context);
  const [username, setUserName] = useState(user.username);

  return (
    <Layout>
      <HelmetTitle title="Conta" />
      <Row>
        <Col md="4">
          <p>
            <i className="far fa-user-circle me-2" />
            Conta
          </p>
          <Form.Row className="mb-3">
            <Form.Label className="text-muted">Nome completo</Form.Label>
            <Form.Control
              type="text"
              value={username || user.username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Label className="text-muted">Email</Form.Label>
            <Form.Control readOnly type="text" value={user.email} />
          </Form.Row>
          <Form.Row className="mb-3">
            <Button
              variant="primary"
              className={username ? "" : "disabled"}
              onClick={() =>
                userClass.handleUpdate({
                  key: user.user_id,
                  username: username,
                })
              }
              size="sm"
            >
              <i className="far fa-save me-2" />
              Salvar
            </Button>
          </Form.Row>
        </Col>
        <Col md="4">
          <Form.Text>Opções</Form.Text>
          <p />
          {user.accountVerified || loading ? (
            <div className="text-success mb-3">
              <i className="far fa-check-circle me-2" />
              Conta verificada
            </div>
          ) : (
            <div className="text-danger mb-3">
              <i className="far fa-times-circle me-2" />
              Conta não verificada
            </div>
          )}
          <Link to="/change-email">
            <i className="far fa-envelope me-2" />
            Mudar e-mail
          </Link>
          <p />
          <Link to="/change-password">
            <i className="far fa-lock me-2" />
            Mudar senha
          </Link>
          <p />
        </Col>
      </Row>
    </Layout>
  );
}
