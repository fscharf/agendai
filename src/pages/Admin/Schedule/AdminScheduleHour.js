import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import ConfirmationToast from "../../../components/Toasters/ConfirmationToast";
import api from "../../../services/api";
import { immediateToast } from "izitoast-react";
import { Link } from "react-router-dom";
import HelmetTitle from "../../../components/Layout/HelmetTitle";

export default function AdminScheduleHour({ scheduleKey }) {
  const [values, setValues] = useState([]);
  const [hour, setHour] = useState("");

  const handleSubmit = async () => {
    if (!hour) {
      return immediateToast("error", {
        message: "Por favor, preencha todos os campos.",
      });
    }
    return await api
      .post("/scheduleHour", {
        hour: hour,
      })
      .then((res) => {
        return immediateToast("success", { message: res.data.message });
      })
      .catch((err) => {
        return immediateToast("error", {
          message: err.response.data.message,
        });
      });
  };

  const handleDelete = async (id) => {
    await api
      .delete(`/scheduleHour/${id}`)
      .then((res) => {
        return immediateToast("success", { message: res.data.message });
      })
      .catch((err) => {
        return immediateToast("error", {
          message: err.response.data.message,
        });
      });
  };

  useEffect(() => {
    const getScheduleHour = async () => {
      await api
        .get("/scheduleHour")
        .then((res) => setValues(res.data))
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };
    getScheduleHour();
  }, [values]);

  return (
    <Row>
      <HelmetTitle title="Gerenciar horários" />
      <Col md="4">
        <p>
          <Link to="/admin">
            <i className="far fa-arrow-left me-2" />
          </Link>
          Gerenciar horários
        </p>
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
        <Form.Control
          className="mb-3"
          type="time"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <Button onClick={handleSubmit}>Enviar</Button>
      </Col>
    </Row>
  );
}
