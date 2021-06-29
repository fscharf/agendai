import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import ConfirmationToast from "../../../components/Toasters/ConfirmationToast";
import api from "../../../services/api";
import { immediateToast } from "izitoast-react";
import HelmetTitle from "../../../components/Layout/HelmetTitle";

export default function ScheduleHour() {
  const [values, setValues] = useState([]);
  const [hour, setHour] = useState("");

  const handleSubmit = async () => {
    if (!hour) {
      return immediateToast("error", {
        title: "Por favor, preencha todos campos.",
      });
    }
    return await api
      .post("/scheduleHour", {
        hour: hour,
      })
      .then((res) => {
        immediateToast("success", { title: res.data.message });
      })
      .catch((err) => {
        immediateToast("error", {
          title: err.response.data.message,
        });
      });
  };

  const handleDelete = async (id) => {
    await api
      .delete(`/scheduleHour/${id}`)
      .then((res) => {
        return immediateToast("success", { title: res.data.message });
      })
      .catch((err) => {
        return immediateToast("error", {
          title: err.response.data.message,
        });
      });
  };

  useEffect(() => {
    const getScheduleHour = async () => {
      await api
        .get("/scheduleHour")
        .then((res) => setValues(res.data))
        .catch((err) => {
          immediateToast("error", { title: err.response.data.message });
        });
    };
    getScheduleHour();
  }, [values]);

  return (
    <Card.Body>
      <HelmetTitle title="Gerenciar horários" />
      <Card.Title>
        <i className="far fa-clock me-2" />
        Horários
      </Card.Title>
      <br />
      <Row>
        <Col md="6" className="mb-3">
          <Form.Label>Escolha um horário</Form.Label>
          <Form.Control
            className="mb-3"
            type="time"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />

          <Button onClick={handleSubmit}>
            <i className="far fa-plus-circle me-2" />
            Adicionar
          </Button>
        </Col>
        <Col md="6">
          <Form.Label className="text-muted">Horários definidos</Form.Label>

          {values &&
            values.map((data) => {
              return (
                <InputGroup className="mb-3" key={data._id}>
                  <Form.Control
                    type="text"
                    value={String(data.hour).replace(":00", "")}
                  />
                  <ConfirmationToast
                    variant="danger"
                    actionTitle={<i className="far fa-trash" />}
                    title="Excluir"
                    onClick={() => handleDelete(data._id)}
                  />
                </InputGroup>
              );
            })}
        </Col>
      </Row>
    </Card.Body>
  );
}
