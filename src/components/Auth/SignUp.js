import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import HelmetTitle from "../Layout/HelmetTitle";
import Icon from "../Layout/Icon";
import { Context } from "../Context/AppContext";

export default function SignUp() {
  const { userClass } = useContext(Context);
  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    loading: false,
  });

  const title = "Cadastre-se grátis";

  const handleSignUp = () => {
    setState({ loading: true });
    userClass.create({
      email: state.email,
      password: state.password,
      name: state.name,
      confirmPassword: state.confirmPassword,
    });
    setState({ loading: false });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex bg-primary align-items-center text-center justify-content-center"
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
              type="text"
              onChange={handleChange}
              name="name"
              value={state.name}
              maxLength="50"
              placeholder="Nome completo"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              onChange={handleChange}
              name="email"
              value={state.email}
              placeholder="E-mail"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              onChange={handleChange}
              name="password"
              value={state.password}
              placeholder="Senha"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              value={state.confirmPassword}
              placeholder="Confirme a senha"
            />
          </Form.Group>
          <Button onClick={handleSignUp} className="btn btn-primary mb-3">
            {state.loading ? (
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
