import React from "react";
import { Card, Col, Container, Jumbotron, Row } from "react-bootstrap";
import Header from "../components/Header";
import Reminders from "../components/Reminders";
import { getUser } from "../components/Utils/Common";

export default function Dashboard() {
  const user = getUser();

  return (
    <Jumbotron fluid>
      <Header />
      <Container>
        <Row className="mb-3">
          <Col md="8" className="mx-auto">
            <Card className="p-5 mb-3">
              <h4 className="text-uppercase">
                Bem-vindo, <strong>{user.username}</strong>{" "}
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
