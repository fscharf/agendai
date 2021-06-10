import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { schedule } from "../../components/Controllers/ScheduleController";

export default function Dashboard() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    schedule.getSchedule({}).then((res) => setValues(res.data));
  }, []);

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
          <Card.Text className="fw-bold">{values.length}</Card.Text>
          <Link className="stretched-link" to="/admin/schedule">
            Gerenciar
          </Link>
        </Col>
      </Row>
    </Card.Body>
  );
}
