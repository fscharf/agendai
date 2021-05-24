import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Jumbotron,
  Row,
} from "react-bootstrap";
import Header from "../../components/Header";
import api from "../../services/api";
import toast from "react-hot-toast";
import history from "../../services/history";
import { getUser } from "../../components/Utils/Common";

export default function Schedule() {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const user = getUser();

  async function handleSubmit() {
    if (!date || !hour || !user.user_id) {
      return toast.error("Por favor, preencha todos campos.");
    }

    if (new Date(date).getUTCDate() < startDate.getUTCDate()) {
      return toast.error("Por favor, selecione uma data válida.");
    }

    // if (
    //   new Date(date).getUTCDate() === startDate.getUTCDate() &&
    //   hour < startDate.getHours()
    // ) {
    //   return toast.error("Por favor, selecione um horário.");
    // }

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
    <Jumbotron className="vh-100 bg-light" fluid>
      <Header />
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
                <select
                  className="mr-sm-2 form-select"
                  id="inlineFormCustomSelect"
                  name="hour"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                </select>
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
    </Jumbotron>
  );
}
