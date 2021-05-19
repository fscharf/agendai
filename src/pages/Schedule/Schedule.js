import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { user } from "../../components/Controllers/UserController";
import Header from "../../components/Header";
import api from "../../services/api";
import toast from "react-hot-toast";
import history from "../../services/history";

export default function Schedule() {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);

  async function handleSubmit() {
    if (!date || !hour || !user.user_id) {
      return toast.error("Por favor, preencha todos campos.");
    }

    await api
      .post("/schedule", {
        hour: hour,
        date: date,
        user_id: user.user_id,
      })
      .then((res) => {
        toast.success(res.data.message)
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
    <Container className="bg-dark vh-100 h-100 text-light" fluid>
      <Header />
      <Container>
        <Row>
          <Col md="8">
            <p>
              <i className="far fa-calendar-plus me-2"></i>NOVO AGENDAMENTO
            </p>
            <Form.Row as={Row}>
              <Col md="6">
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
                  <select
                    className="mr-sm-2 form-select bg-light"
                    id="inlineFormCustomSelect"
                    name="hour"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                  >
                    <option value={null}>Selecione...</option>
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
                    <i className="far fa-check-circle me-2"></i>CONFIRMAR
                  </Button>
                </Form.Row>
              </Col>
            </Form.Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
