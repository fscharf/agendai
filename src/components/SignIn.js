import React, { useState } from "react";
import { Col, Form, Row, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import api from "../services/api";
import { setUserSession } from "./Utils/Common";
import history from "../services/history";
import toast from "react-hot-toast";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        toast.success(res.data.message);
        return history.push("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        if (
          (err.response && err.response.status === 401) ||
          (err.response && err.response.status === 400)
        ) {
          return toast.error(err.response.data.message);
        } else {
          return toast.error("Oops, algo deu errado.");
        }
      });
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center text-center justify-content-center">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container>
        <Row>
          <Col md="4" className="mx-auto">
            <Card className="mb-3 p-5">
              <div className="d-grid">
                <Link to="/">
                  <Card.Title className="fw-bold brand-title">Barber Shop.</Card.Title>
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
                  {loading ? <Loading /> : <span>ENTRAR</span>}
                </Button>

                <Form.Text className="mb-3">
                  Não possui conta ainda? &nbsp;
                  <Link to="/signup">Cadastre-se grátis</Link>
                </Form.Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
