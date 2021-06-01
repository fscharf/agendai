import React, { useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "./Controllers/UserController";
import HelmetTitle from "./Layout/HelmetTitle";
import Icon from "./Layout/Icon";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const title = "Cadastre-se grátis";
  const userFields = new User();

  const handleSignUp = () => {
    setLoading(true);
    userFields
      .createUser({
        email: email,
        password: password,
        name: name,
        confirmPassword: confirmPassword,
      })
      .then(() => {
        return setLoading(false);
      });
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center text-center justify-content-center"
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
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              placeholder="E-mail"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              maxLength="50"
              name="name"
              placeholder="Nome completo"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Senha"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirme a senha"
            />
          </Form.Group>
          <Button onClick={handleSignUp} className="btn btn-primary mb-3">
            {loading ? (
              <Spinner animation="border" size="sm" role="status" />
            ) : (
              <span>Começar!</span>
            )}
          </Button>
          <Form.Text className="mb-3">
            Já possui conta? &nbsp;
            <Link to="/signin">Iniciar sessão</Link>
          </Form.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
