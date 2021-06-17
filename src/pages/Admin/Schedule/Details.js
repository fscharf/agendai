import { immediateToast } from "izitoast-react";
import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import ConfirmationToast from "../../../components/Toasters/ConfirmationToast";
import api from "../../../services/api";

export default function Details({ schedule, users, ...rest }) {
  const [state, setState] = useState({
    show: false,
    hour: null,
    date: null,
    status: true,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = () => {
    api
      .put(`/schedule/${schedule.schedule_id}`, {
        status: state.status,
        hour: state.hour,
        date: state.date,
      })
      .then((res) => {
        immediateToast("success", {
          title: res.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        immediateToast("error", { title: err.response.data.message });
      });
  };

  const handleClose = () => setState({ show: false });
  const handleShow = () => setState({ show: true });

  return (
    <>
      <Modal show={state.show} onHide={handleClose}>
        <Modal.Header>
          <span>
            <i className="far fa-pen me-2" />
            Editar
          </span>
          <button className="btn-close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Container>
            {schedule && users && (
              <Form>
                <Form.Row className="mb-3">
                  <Form.Text>Nome</Form.Text>
                  <Form.Control type="text" readOnly value={users.username} />
                </Form.Row>
                <Form.Row className="mb-3">
                  <Form.Text>Hora</Form.Text>
                  <Form.Control
                    type="time"
                    value={state.hour || schedule.hour}
                    name="hour"
                    onChange={handleChange}
                  />
                </Form.Row>
                <Form.Row className="mb-3">
                  <Form.Text>Data</Form.Text>
                  <Form.Control
                    type="date"
                    value={state.date || schedule.date}
                    name="date"
                    onChange={handleChange}
                  />
                </Form.Row>
                <Form.Row className="mb-3">
                  <Form.Text>Status</Form.Text>
                  <select
                    value={state.status || schedule.status}
                    className="form-select"
                    name="status"
                    onChange={handleChange}
                  >
                    <option value={true}>Confirmado</option>
                    <option value={false}>Cancelado</option>
                  </select>
                </Form.Row>
              </Form>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <i className="far fa-save me-2" />
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Button {...rest} onClick={handleShow}>
        <i className="far fa-pen" />
      </Button>
    </>
  );
}
