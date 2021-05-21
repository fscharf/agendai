import React from "react";
import { Alert, Card, Col, Container, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Reminders from "../components/Reminders";
import { user } from "../components/Controllers/UserController";

export default function Dashboard() {
  return (
    <Jumbotron fluid>
      <Header />
      <Container>
        {!user.account_verified ? (
          <Row className="mb-3">
            <Col md="8">
              <Alert variant="danger">
                Sua conta ainda não foi verificada. Você precisa disso pra
                agendar cortes :/{" "}
                <Link to="/" className="fw-bold">
                  Enviar e-mail de confirmação
                </Link>
              </Alert>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
        <Row className="mb-3">
          <Col md="8" className="mx-auto">
            <Card className="p-5 mb-3">
              <h4 className="text-uppercase">
                BEM-VINDO, <strong>{user.name}</strong>{" "}
              </h4>
              <p className="text-muted">Que tal olhar os lembretes?</p>
              <Reminders />
            </Card>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}
