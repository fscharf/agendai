import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import ConfirmationToast from "../../../components/Toasters/ConfirmationToast";
import api from "../../../services/api";
import { immediateToast } from "izitoast-react";
import { useParams } from "react-router-dom";
import HelmetTitle from "../../../components/Layout/HelmetTitle";
import Accordion from "../../../components/Accordion";

export default function ScheduleHour() {
  const [values, setValues] = useState([]);
  const [hour, setHour] = useState("");
  useParams();

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
      <hr />
      <Row>
        <Col md="6" className="mb-3">
          <Form.Label>Escolha um horário</Form.Label>
          <Form.Control
            className="mb-3"
            type="time"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
          <Button onClick={handleSubmit}>Adicionar</Button>
        </Col>
        <Col md="6">
          <Accordion title="Horários definidos" id="ScheduleHour">
            {values.map((data, key) => {
              return (
                <InputGroup className="mb-3" key={key}>
                  <Form.Control type="text" value={data.hour} />
                  <ConfirmationToast
                    variant="danger"
                    actionTitle={<i className="far fa-times" />}
                    title="Excluir"
                    onClick={() => handleDelete(data._id)}
                  />
                </InputGroup>
              );
            })}
          </Accordion>
        </Col>
      </Row>
    </Card.Body>
  );
}
