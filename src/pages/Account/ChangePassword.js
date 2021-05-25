import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import api from "../../services/api";
import history from "../../services/history";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getUser } from "../../components/Utils/Common";

export var successMsg;

export default function ChangePassword() {
  const [, setUserInfo] = useState([]);
  const [credentials, setCredentials] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const user = getUser();

  useEffect(() => {
    async function getUserById() {
      await api
        .get(`/users/${user.user_id}`)
        .then((res) => {
          return setUserInfo(res.data.password);
        })
        .catch((err) => {
          toast.error(err);
          history.push("/dashboard");
        });
    }

    getUserById();
  }, []);

  async function handleChangePassword() {
    if (
      !credentials.newPassword ||
      !credentials.password ||
      !credentials.confirmNewPassword
    ) {
      return toast.error("Por favor, preencha todos os campos.");
    }

    if (credentials.newPassword !== credentials.confirmNewPassword) {
      return toast.error("Senhas não conferem.");
    }

    await api
      .put(`/users/${user.user_id}`, {
        password: credentials.newPassword,
        checkPassword: credentials.password,
      })
      .then(() => {
        toast.success("Senha atualizada com sucesso.");
        history.push("/account");
      })
      .catch((err) => {
        if (err.response || err.response.data === 400 || 401) {
          return toast.error(err.response.data.message);
        }
      });
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col md="4" className="mx-auto">
            <Card className="mb-3 p-5">
              <Card.Text>
                <Link to="/account" title="Voltar" className="btn btn-primary">
                  <i className="far fa-arrow-left"></i>
                </Link>
                <i className="far fa-lock ms-3 me-2"></i>TROCAR SENHA
              </Card.Text>

              <Form.Row className="mb-3">
                <Form.Label>Senha atual</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Senha atual"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      password: e.target.value,
                      newPassword: credentials.newPassword,
                      confirmNewPassword: credentials.confirmNewPassword,
                    })
                  }
                />
              </Form.Row>
              <Form.Row className="mb-3">
                <Form.Label>Nova senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nova senha"
                  value={credentials.newPassword}
                  onChange={(e) =>
                    setCredentials({
                      newPassword: e.target.value,
                      password: credentials.password,
                      confirmNewPassword: credentials.confirmNewPassword,
                    })
                  }
                />
              </Form.Row>
              <Form.Row className="mb-3">
                <Form.Label>Confirme a nova senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirme a nova senha"
                  value={credentials.confirmNewPassword}
                  onChange={(e) =>
                    setCredentials({
                      confirmNewPassword: e.target.value,
                      newPassword: credentials.newPassword,
                      password: credentials.password,
                    })
                  }
                />
              </Form.Row>
              <Form.Row className="d-grid mb-3">
                <Button variant="primary" onClick={handleChangePassword}>
                  <i className="far fa-check-circle me-2"></i>ENVIAR
                </Button>
              </Form.Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
