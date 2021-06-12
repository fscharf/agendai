import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ScheduleHour from "./ScheduleHour";
import Layout from "../../components/Layout/Layout";
import ScheduleDesc from "./ScheduleDesc";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { Context } from "../../components/Context/AppContext";
import axios from "axios";

export default function NewSchedule() {
  const { user, scheduleClass, scheduleHourClass } = useContext(Context);

  const [state, setState] = useState({
    schedule: [],
    scheduleHour: [],
    date: null,
    hour: null,
    description: null,
  });

  useEffect(() => {
    axios
      .all([
        scheduleHourClass.get(),
        scheduleClass.get({
          userKey: user.user_id,
          date: state.date,
          hour: state.hour,
          status: state.status,
        }),
      ])
      .then(
        axios.spread((res1, res2) => {
          setState({ scheduleHour: res1.data, schedule: res2.data });
        })
      );
  }, []);

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
              name="date"
              value={state.date}
              onChange={handleChange}
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Label>Tipo de atendimento</Form.Label>
            <ScheduleDesc
              name="description"
              value={state.description}
              onChange={handleChange}
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Label>Escolha um horário</Form.Label>
            <ScheduleHour
              name="hour"
              value={state.hour}
              onChange={handleChange}
            >
              {state.scheduleHour.map((data) => {
                return (
                  <option
                    disabled={() =>
                      data._id === state.schedule.schedule_hour_id
                        ? false
                        : true
                    }
                    key={data._id}
                  >
                    {String(data.hour).replace(":00", "")}
                  </option>
                );
              })}
            </ScheduleHour>
          </Form.Row>
          <Form.Row className="d-grid">
            <Button onClick={handleSubmit}>Confirmar</Button>
          </Form.Row>
        </Col>
      </Row>
    </Layout>
  );
}
