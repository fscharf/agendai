import React, { useContext, useState } from "react";
import { Button, Form, Modal, Container } from "react-bootstrap";
import ScheduleHour from "./ScheduleHour";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { Context } from "../../components/Context/AppContext";
import Description from "./Description";

export default function NewSchedule({ children, ...rest }) {
  const { user, scheduleClass } = useContext(Context);

  const [state, setState] = useState({
    scheduleHour: [],
    date: null,
    hour: null,
    description: null,
    show: false,
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

  const handleClose = () => setState({ show: false });
  const handleShow = () => setState({ show: true });

  return (
    <>
      <Modal centered show={state.show} onHide={handleClose}>
        <Modal.Header>
          <HelmetTitle title="Novo agendamento" />
          <h5>
            <i className="far fa-calendar-plus me-2" />
            Agendar
          </h5>

          <button onClick={handleClose} className="btn-close" />
        </Modal.Header>
        <Modal.Body>
          <Container>
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
              <Form.Label>Atendimento</Form.Label>
              <Description
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
              />
            </Form.Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Confirmar</Button>
        </Modal.Footer>
      </Modal>

      <Button {...rest} onClick={handleShow}>
        {children}
      </Button>
    </>
  );
}
