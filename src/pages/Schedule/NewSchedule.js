import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ScheduleHour from "./ScheduleHour";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { Context } from "../../components/Context/AppContext";
import Description from "./Description";

export default function NewSchedule() {
  const { user, scheduleClass } = useContext(Context);

  const [state, setState] = useState({
    scheduleHour: [],
    date: null,
    hour: null,
    description: null,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = () => {
    scheduleClass.create({
      hour: state.hour,
      date: state.date,
      description: state.description,
      userKey: user.user_id,
    });
  };

  return (
    <Layout>
      <HelmetTitle title="Agendar" />
      <Form.Label>
        <i className="far fa-calendar-plus me-2" />
        Agendar
      </Form.Label>
      <hr />
      <Row>
        <Col md="6" className="mx-auto">
          <p />
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="4">
              Escolha uma data
            </Form.Label>
            <Col md="8">
              <Form.Control
                type="date"
                name="date"
                value={state.date}
                onChange={handleChange}
              />
            </Col>
          </Form.Row>
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="4">
              Atendimento
            </Form.Label>
            <Col md="8">
              <Description
                name="description"
                value={state.description}
                onChange={handleChange}
              />
            </Col>
          </Form.Row>
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="4">
              Escolha um horário
            </Form.Label>
            <Col md="8">
              <ScheduleHour
                name="hour"
                value={state.hour}
                onChange={handleChange}
              />
            </Col>
          </Form.Row>
          <Form.Row className="text-end">
            <Button onClick={handleSubmit}>
              Confirmar <i className="far fa-arrow-right" />
            </Button>
          </Form.Row>
        </Col>
      </Row>
    </Layout>
  );
}
