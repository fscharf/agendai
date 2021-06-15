import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import ConfirmationToast from "../../../components/Toasters/ConfirmationToast";
import api from "../../../services/api";
import { immediateToast } from "izitoast-react";
import HelmetTitle from "../../../components/Layout/HelmetTitle";
import Accordion from "../../../components/Accordion";

export default function ScheduleAtt() {
  const [state, setState] = useState({
    description: "",
    edit: "",
    scheduleAtt: [],
  });

  const handleSubmit = async () => {
    if (!state.description) {
      return immediateToast("error", {
        title: "Por favor, preencha todos campos.",
      });
    }
    await api
      .post("/schedule-att", {
        description: state.description,
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
      .delete(`/schedule-att/${id}`)
      .then((res) => {
        return immediateToast("success", { title: res.data.message });
      })
      .catch((err) => {
        return immediateToast("error", {
          title: err.response.data.message,
        });
      });
  };

  const handleUpdate = async (id) => {
    await api
      .put(`/schedule-att/${id}`, { description: state.edit })
      .then((res) => {
        return immediateToast("success", { title: res.data.message });
      })
      .catch((err) => {
        return immediateToast("error", {
          title: err.response.data.message,
        });
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    (async () => {
      await api
        .get("/schedule-att")
        .then((res) => setState({ scheduleAtt: res.data }));
    })();
  }, []);

  return (
    <Card.Body>
      <HelmetTitle title="Gerenciar atendimentos" />
      <Card.Title>
        <i className="far fa-clipboard me-2" />
        Atendimentos
      </Card.Title>
      <hr />
      <Row>
        <Col md="6" className="mb-3">
          <Form.Label>Defina um atendimento</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            maxLength="50"
            name="description"
            placeholder="e.g. R$20,00 - Barba e Corte"
            value={state.description}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Adicionar</Button>
        </Col>
        <Col md="6">
          <Accordion title="Atendimentos definidos" id="ScheduleAtt">
            {state.scheduleAtt &&
              state.scheduleAtt.map((data) => {
                return (
                  <InputGroup className="mb-3" key={data._id}>
                    <Form.Control
                      type="text"
                      name="edit"
                      value={state.edit || data.description}
                      onChange={handleChange}
                    />
                    {state.edit && state.edit !== data.description && (
                      <Button title="Salvar" onClick={() => handleUpdate(data._id)}>
                        <i className="far fa-save" />
                      </Button>
                    )}
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
