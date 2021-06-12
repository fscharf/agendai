import React, { useContext, useState } from "react";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import api from "../../services/api";
import history from "../../services/history";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { immediateToast } from "izitoast-react";
import { Context } from "../../components/Context/AppContext";

export default function ChangePassword() {
  const { user } = useContext(Context);

  const [state, setState] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChangePassword = async () => {
    if (!state.password || !state.newPassword || !state.confirmNewPassword) {
      return immediateToast("error", {
        title: "Por favor, preencha todos os campos.",
      });
    }

    if (state.newPassword !== state.confirmNewPassword) {
      return immediateToast("error", { title: "Senhas não conferem." });
    }

    if (state.newPassword.length < 6) {
      return immediateToast("error", {
        title: "Sua senha deve conter pelo menos 6 caracteres.",
      });
    }

    if (state.newPassword === state.password) {
      return immediateToast("error", {
        title: "Nova senha não pode ser igual a atual.",
      });
    }

    await api
      .put(`/users/${user.user_id}`, {
        password: state.newPassword,
        checkPassword: state.password,
      })
      .then(() => {
        immediateToast("success", { title: "Senha atualizada com sucesso." });
        history.push("/account");
      })
      .catch((err) => {
        immediateToast("error", { title: err.response.data.message });
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <Card.Body>
      <HelmetTitle title="Alterar senha" />
      <Card.Title>
        <i className="far fa-lock me-2"></i>Alterar senha
      </Card.Title>
      <hr />
      <Card.Text className="text-start text-sm-end">
        <Form.Row as={Row} className="mb-3">
          <Form.Label column md="3">
            Senha atual
          </Form.Label>
          <Col md="7">
            <Form.Control
              type="password"
              placeholder="Senha atual"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </Col>
        </Form.Row>
        <Form.Row as={Row} className="mb-3">
          <Form.Label column md="3">
            Nova senha
          </Form.Label>
          <Col md="7">
            <Form.Control
              type="password"
              placeholder="Nova senha"
              name="newPassword"
              value={state.newPassword}
              onChange={handleChange}
            />
          </Col>
        </Form.Row>
        <Form.Row as={Row}>
          <Form.Label column md="3">
            Confirme a nova senha
          </Form.Label>
          <Col md="7" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirme a nova senha"
              name="confirmNewPassword"
              value={state.confirmNewPassword}
              onChange={handleChange}
            />
          </Col>
          <Col md="2">
            <Button className="w-100" onClick={handleChangePassword}>
              Enviar
              <i className="far fa-arrow-right ms-2" />
            </Button>
          </Col>
        </Form.Row>
        <Form.Row></Form.Row>
      </Card.Text>
    </Card.Body>
  );
}
