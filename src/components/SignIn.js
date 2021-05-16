import React, { useState } from "react";
import {
  Col,
  Form,
  Row,
  Button,
  Card,
  Container,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import lightIcon from "../assets/img/icon.svg";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import api from "../services/api";
import { setUserSession } from "./Utils/Common";

export default function SignIn(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const title = "Iniciar sessão";

  const handleSignIn = () => {
    api
      .post("/users/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        setUserSession(res.data.token, res.data.user);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        if (
          (err.response && err.response.status === 401) ||
          (err.response && err.response.status === 400)
        ) {
          setError(err.response.data.message);
        } else {
          setError("Oops! Alguma coisa deu errado.");
        }
      });
  };

  return (
    <Container fluid className="bg-dark text-center vh-100">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container>
        <Row>
          <Col md="4" className="mx-auto">
            <Card bg="dark" className="p-4 text-light border-0 shadow-sm">
              <div className="d-grid">
                <Link to="/">
                  <img
                    src={lightIcon}
                    alt="icon"
                    className="img-fluid"
                    width="125"
                  />
                </Link>
                <br />
                <Form.Group className="mb-3">
                  <Card.Text>
                    <strong>INICIAR SESSÃO</strong>
                  </Card.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Digite seu e-mail"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                  />
                </Form.Group>
                <Button onClick={handleSignIn} className="btn btn-primary mb-3">
                  {loading ? <Loading /> : <small>ENTRAR</small>}
                </Button>

                <Form.Text className="mb-3">
                  Não possui conta ainda? &nbsp;
                  <Link to="/signup">Cadastre-se grátis</Link>
                </Form.Text>
                {error && (
                  <Alert variant="danger" className="fw-bold">
                    {error}
                  </Alert>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
