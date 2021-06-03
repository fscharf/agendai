import React, { useState } from "react";
import { Form, Button, Card, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { setUserSession } from "../Utils/Common";
import toast from "react-hot-toast";
import HelmetTitle from "../Layout/HelmetTitle";
import Icon from "../Layout/Icon";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const title = "Iniciar sessão";

  const handleSignIn = () => {
    setLoading(true);
    api
      .post("/users/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        setUserSession(res.data.token, res.data.user);
        toast.success(res.data.message);
        setTimeout(() => (window.location.href = "/dashboard"), 2000);
      })
      .catch((err) => {
        setLoading(false);
        if (err) {
          return toast.error(err.response.data.message);
        }
      });
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center text-center justify-content-center"
    >
      <HelmetTitle title={title} />
      <Card className="mb-3 p-4 p-sm-5" style={{ width: "25rem" }}>
        <Card.Body className="d-grid">
          <Link to="/">
            <Icon width="50" className="mx-auto" />
          </Link>
          <p />
          <Form.Group className="mb-3">
            <Card.Text>
              <strong>{title}</strong>
            </Card.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="E-mail"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
          </Form.Group>
          <Button onClick={handleSignIn} className="btn btn-primary mb-3">
            {loading ? (
              <Spinner animation="border" size="sm" role="status" />
            ) : (
              <span>Entrar</span>
            )}
          </Button>

          <Link className="btn btn-outline-primary mb-3" to="/forgot-password">
            Esqueci minha senha
          </Link>
          <Form.Text>
            <Link to="/signup">
              <small>Não tem conta? Cadastre-se grátis</small>
            </Link>
          </Form.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
