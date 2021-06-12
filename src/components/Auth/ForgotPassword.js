import { immediateToast } from "izitoast-react";
import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import HelmetTitle from "../Layout/HelmetTitle";
import Icon from "../Layout/Icon";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const title = "Esqueci minha senha";

  const handleSubmit = () => {
    api
      .post("/reset-password", {
        email: email,
      })
      .then((res) => {
        immediateToast("success", { title: res.data.message });
        return setEmail("");
      })
      .catch((err) => {
        immediateToast("error", { title: err.response.data.message });
      });
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center bg-primary text-center justify-content-center"
    >
      <HelmetTitle title={title} />
      <Card className="p-4 p-sm-5" style={{ width: "25rem" }}>
        <Card.Body className="d-grid">
          <Link to="/">
            <Icon width="50" className="mx-auto" />
          </Link>
          <p />
          <Form.Group className="mb-3">
            <Card.Text>
              <strong>{title}</strong>
            </Card.Text>
            <Form.Text>
              Enviaremos um link em seu e-mail para recuperar sua senha.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="E-mail"
            />
          </Form.Group>
          <Button
            className="mb-3"
            variant="primary"
            onClick={() => handleSubmit()}
          >
            Enviar
          </Button>
          <Form.Text className="mb-3">
            <Link to="/signin">
              <small>Lembrou a senha? Iniciar sessão</small>
            </Link>
          </Form.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
