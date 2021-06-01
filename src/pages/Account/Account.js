import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser } from "../../components/Utils/Common";
import { User } from "../../components/Controllers/UserController";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";

export default function Account() {
  const [users, setUserInfo] = useState([]);
  const [username, setUserName] = useState("");
  const user = getUser();
  const fields = new User();

  const handleUpdate = (username) => {
    if (username === users.username) {
      return;
    }

    if (!username) {
      return toast.error("Por favor, preencha todos os campos.");
    }

    return fields.updateUser({
      userKey: user.user_id,
      name: username,
    });
  };

  useEffect(() => {
    function getUserById() {
      fields
        .getUserById({ userKey: user.user_id })
        .then((res) => {
          return setUserInfo(res.data);
        })
        .catch((err) => {
          return toast.error(err);
        });
    }

    getUserById();
    //eslint-disable-next-line
  }, []);

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
              value={username || users.username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Label className="text-muted">Email</Form.Label>
            <Form.Control readonly type="text" value={users.email} />
          </Form.Row>
          <Form.Row className="mb-3">
            <Button
              variant="primary"
              className={username ? "" : "disabled"}
              onClick={() => handleUpdate(username)}
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
          {users.accountVerified ? (
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
          <Link className="btn btn-primary btn-sm" to="/change-email">
            <i className="far fa-envelope me-2" />
            Mudar e-mail
          </Link>
          <p />
          <Link className="btn btn-primary btn-sm" to="/change-password">
            <i className="far fa-lock me-2" />
            Mudar senha
          </Link>
          <p />
        </Col>
      </Row>
    </Layout>
  );
}
