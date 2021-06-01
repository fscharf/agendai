import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import api from "../../services/api";
import history from "../../services/history";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getUser } from "../../components/Utils/Common";
import HelmetTitle from "../../components/Layout/HelmetTitle";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const user = getUser();

  async function handleChangePassword() {
    if (!newPassword || !password || !confirmNewPassword) {
      return toast.error("Por favor, preencha todos os campos.");
    }

    if (newPassword !== confirmNewPassword) {
      return toast.error("Senhas não conferem.");
    }

    if (newPassword.length < 6) {
      return toast.error("Sua senha deve conter pelo menos 6 caracteres.");
    }

    if (newPassword === password) {
      return toast.error("Nova senha não pode ser igual a atual.");
    }

    return await api
      .put(`/users/${user.user_id}`, {
        password: newPassword,
        checkPassword: password,
      })
      .then(() => {
        toast.success("Senha atualizada com sucesso.");
        history.push("/account");
      })
      .catch((err) => {
        return toast.error(err.response.data.message);
      });
  }

  return (
    <Layout>
      <HelmetTitle title="Mudar senha" />
      <Row>
        <Col md="4">
          <p>
            <Link to="/account" title="Voltar">
              <i className="far fa-arrow-left"></i>
            </Link>
            <i className="far fa-lock ms-3 me-2"></i>Mudar senha
          </p>

          <Form.Row className="mb-3">
            <Form.Label>Senha atual</Form.Label>
            <Form.Control
              type="password"
              placeholder="Senha atual"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Label>Nova senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Label>Confirme a nova senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirme a nova senha"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Row>
          <Form.Row className="d-grid mb-3">
            <Button variant="primary" onClick={handleChangePassword}>
              Enviar
            </Button>
          </Form.Row>
        </Col>
      </Row>
    </Layout>
  );
}
