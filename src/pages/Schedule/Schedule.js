import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import api from "../../services/api";
import toast from "react-hot-toast";
import history from "../../services/history";
import { getUser } from "../../components/Utils/Common";
import ScheduleHour from "./ScheduleHour";
import Layout from "../../components/Layout/Layout";

export default function Schedule() {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [startDate,] = useState(new Date());
  const user = getUser();

  async function handleSubmit() {
    if (!date || !hour || !user.user_id) {
      return toast.error("Por favor, preencha todos campos.");
    }

    if (new Date(date).getUTCDate() < startDate.getUTCDate()) {
      return toast.error("Por favor, selecione uma data válida.");
    }

    await api
      .post("/schedule", {
        hour: hour,
        date: date,
        user_id: user.user_id,
      })
      .then((res) => {
        toast.success(res.data.message);
        return history.push("/schedule-list");
      })
      .catch((err) => {
        if (
          err.response ||
          err.response.data.message === 400 ||
          err.response ||
          err.response.data.message === 401
        )
          return toast.error(err.response.data.message);
      });
  }

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
                  selected={startDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Row>
              <Form.Row className="mb-3">
                <Form.Label>Escolha um horário</Form.Label>
                <ScheduleHour value={hour} onChange={(e) => setHour(e.target.value)} />
              </Form.Row>
              <Form.Row className="d-grid">
                <Button onClick={handleSubmit} className="btn btn-primary">
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
