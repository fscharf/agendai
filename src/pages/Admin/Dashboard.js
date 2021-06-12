import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Card.Body>
      <Card.Title>
        <i className="far fa-sliders-h me-2" />
        Painel
      </Card.Title>
      <hr />
      <Row>
        <Col md="3">
          <Card.Text className="text-muted">Total de agendamentos</Card.Text>
          <Card.Text className="fw-bold">0</Card.Text>
          <Link className="stretched-link" to="/admin/schedule">
            Gerenciar
          </Link>
        </Col>
        <Col md="3">
          <Card.Text className="text-muted">Total de usuários</Card.Text>
          <Card.Text className="fw-bold">0</Card.Text>
          <Link className="stretched-link" to="/admin/schedule">
            Gerenciar
          </Link>
        </Col>
      </Row>
    </Card.Body>
  );
}
