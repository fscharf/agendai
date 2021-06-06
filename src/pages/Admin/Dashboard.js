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
    <Row>
      <Col md>
        <Row>
          <Col md="2">
            <Card>
              <Card.Body>
                <Card.Text className="text-muted">
                  Total de agendamentos
                </Card.Text>
                <Card.Text className="fw-bold">{values.length}</Card.Text>
                <Link className="stretched-link" to="/admin/schedule">
                  Gerenciar
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
