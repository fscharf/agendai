import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Reminders from "../components/Reminders";
import { user } from "../routes";

export default function Dashboard() {
  return (
    <Container fluid className="vh-100 text-light bg-dark">
      <Header />
      <Container>
        <Row className="mb-3">
          <Col md="8">
            <h4 className="text-uppercase">BEM-VINDO, {user.name}</h4>
            <p className="text-muted">Que tal olhar os lembretes?</p>
          </Col>
        </Row>
        <Reminders />
      </Container>
    </Container>
  );
}
