import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getUser } from "../../components/Utils/Common";
import ScheduleHour from "./ScheduleHour";
import Layout from "../../components/Layout/Layout";
import { Schedule } from "../../components/Controllers/ScheduleController";
import ScheduleDesc from "./ScheduleDesc";
import HelmetTitle from "../../components/Layout/HelmetTitle";

export default function ScheduleForm() {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [description, setDescription] = useState("");
  const user = getUser();
  const schedule = new Schedule();

  return (
    <Layout>
      <HelmetTitle title="Agendar" />
      <Row>
        <Col md="4" className="mx-auto">
          <Form.Text>
            <i className="far fa-calendar-plus me-2" />
            Agendar
          </Form.Text>
          <p />
          <Form.Row className="mb-3">
            <Form.Label>Escolha uma data</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Label>Tipo de atendimento</Form.Label>
            <ScheduleDesc
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              onClick={() =>
                schedule.createSchedule({
                  date: date,
                  hour: hour,
                  description: description,
                  userKey: user.user_id,
                })
              }
              className="btn btn-primary"
            >
              Confirmar
            </Button>
          </Form.Row>
        </Col>
      </Row>
    </Layout>
  );
}
