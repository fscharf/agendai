import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { User } from "./Controllers/UserController";
import Loading from "./Loading";

export default function SignUp() {
  const title = "Cadastre-se grátis no Barber Shop";
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const userFields = new User();

  const handleSignUp = () => {
    userFields
      .createUser({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        confirmPassword: credentials.confirmPassword,
      })
      .then(() => {
        setLoading(userFields.loading);
      })
      .catch((err) => {
        if (err) setLoading(userFields.loading);
      });
  };


  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center text-center justify-content-center"
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container>
        <Row>
          <Col md="4" className="mx-auto">
            <Card className="p-5 mb-3">
              <Form.Row className="d-grid">
                <Link to="/">
                  <Card.Title className="fw-bold brand-title">
                    Barber Shop.
                  </Card.Title>
                </Link>
                <br />
                <Form.Group className="mb-3">
                  <Card.Text>
                    <strong>CADASTRE-SE GRÁTIS</strong>
                  </Card.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    onChange={(e) =>
                      setCredentials({
                        email: e.target.value,
                        password: credentials.password,
                        confirmPassword: credentials.confirmPassword,
                        name: credentials.name,
                      })
                    }
                    value={credentials.email}
                    name="email"
                    placeholder="E-mail"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      setCredentials({
                        name: e.target.value,
                        password: credentials.password,
                        confirmPassword: credentials.confirmPassword,
                        email: credentials.email,
                      })
                    }
                    value={credentials.name}
                    maxLength="50"
                    name="name"
                    placeholder="Nome completo"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={(e) =>
                      setCredentials({
                        password: e.target.value,
                        name: credentials.name,
                        confirmPassword: credentials.confirmPassword,
                        email: credentials.email,
                      })
                    }
                    value={credentials.password}
                    placeholder="Senha"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    onChange={(e) =>
                      setCredentials({
                        confirmPassword: e.target.value,
                        password: credentials.password,
                        name: credentials.name,
                        email: credentials.email,
                      })
                    }
                    value={credentials.confirmPassword}
                    placeholder="Confirme a senha"
                  />
                </Form.Group>
                <Button onClick={handleSignUp} className="btn btn-primary mb-3">
                  {loading ? <Loading /> : <span>ENVIAR</span>}
                </Button>
              </Form.Row>
              <Form.Text className="mb-3">
                Já possui conta? &nbsp;
                <Link to="/signin">Iniciar sessão</Link>
              </Form.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
