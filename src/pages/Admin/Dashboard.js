import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Dashboard() {
  const [state, setState] = useState({
    schedule: [],
    users: [],
  });

  useEffect(() => {
    axios.all([api.get("/schedule"), api.get("/users")]).then(
      axios.spread((schedule, users) => {
        setState({ schedule: schedule.data, users: users.data });
      })
    );
  }, []);

  return (
    <Card.Body>
      <Card.Title>
        <i className="far fa-sliders-h me-2" />
        Painel
      </Card.Title>
      <hr />
      <Row>
        <Col md="4">
          <Card>
            <Card.Body>
              <Card.Text className="text-muted">
                Total de agendamentos
              </Card.Text>
              <Card.Text className="fw-bold">{state.schedule.length}</Card.Text>
              <Link className="stretched-link" to="/admin/schedule">
                Gerenciar
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Body>
              <Card.Text className="text-muted">
                Total de usuários ativos
              </Card.Text>
              <Card.Text className="fw-bold">{state.users.length}</Card.Text>
              <Link className="stretched-link" to="/admin/users">
                Gerenciar
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Card.Body>
  );
}
