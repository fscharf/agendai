import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ScheduleHour from "./ScheduleHour";
import Layout from "../../components/Layout/Layout";
import ScheduleDesc from "./ScheduleDesc";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { Context } from "../../components/Context/AppContext";
import api from "../../services/api";

export default function ScheduleForm() {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [description, setDescription] = useState("");
  const [sHour, setSHour] = useState([]);

  const { user, scheduleHour, scheduleClass } = useContext(Context);

  const handleSubmit = async () => {
    await api.get("/scheduleHour", { params: { hour: hour } }).then((res) => {
      setSHour(res.data);
    });
    const sKey = sHour.map((key) => {
      return key._id;
    });

    return scheduleClass.createSchedule({
      hour: hour,
      date: date,
      description: description,
      userKey: user.user_id,
      scheduleHourKey: parseInt(sKey),
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
            >
              {scheduleHour.map((data) => {
                return <option key={data._id}>{data.hour}</option>;
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
