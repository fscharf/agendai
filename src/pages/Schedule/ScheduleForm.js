import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { getUser } from "../../components/Utils/Common";
import ScheduleHour from "./ScheduleHour";
import Layout from "../../components/Layout/Layout";
import { Schedule } from "../../components/Controllers/ScheduleController";

export default function ScheduleForm() {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const user = getUser();
  const schedule = new Schedule();

  return (
    <Layout>
      <Container>
        <Row>
          <Col md="4" className="mx-auto">
            <Card className="p-5">
              <Card.Text>
                <i className="far fa-calendar-plus me-2" />
                NOVO AGENDAMENTO
              </Card.Text>
              <Form.Row className="mb-3">
                <Form.Label>Escolha uma data</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Row>
              <Form.Row className="mb-3">
                <Form.Label>Escolha um horário</Form.Label>
                <ScheduleHour
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                />
              </Form.Row>
              <Form.Row className="d-grid">
                <Button
                  onClick={() => schedule.createSchedule({
                    date: date,
                    hour: hour,
                    userKey: user.user_id,
                  })}
                  className="btn btn-primary"
                >
                  <i className="far fa-check-circle me-2" />
                  CONFIRMAR
                </Button>
              </Form.Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
