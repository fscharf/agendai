import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import HelmetTitle from "../Layout/HelmetTitle";
import Icon from "../Layout/Icon";
import { Context } from "../Context/AppContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const title = "Cadastre-se grátis";

  const { userClass } = useContext(Context);

  const handleSignUp = () => {
    setLoading(true);
    userClass
      .createUser({
        email: email,
        password: password,
        name: name,
        confirmPassword: confirmPassword,
      })
      .then(() => {
        setLoading(false);
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
              placeholder="E-mail"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              maxLength="50"
              placeholder="Nome completo"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
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
          <Form.Text>
            <Link to="/signin">
              <small>Já tem conta? Iniciar sessão</small>
            </Link>
          </Form.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
