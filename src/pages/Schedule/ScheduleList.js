import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { user } from "../../components/Controllers/UserController";
import Header from "../../components/Header";
import api from "../../services/api";

export default function ScheduleList() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [status, setStatus] = useState("");

  const getAllSchedule = () => {
    api
      .get("/schedule", {
        params: {
          user_id: user.user_id,
          date: date,
          hour: hour,
          status: status,
        },
      })
      .then((res) => {
        return setSchedule(res.data);
      })
      .catch((err) => {
        if (err.response || err.response.data === 401 || 400) {
          return toast.error(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    getAllSchedule();
  }, []);

  return (
    <Container fluid className="vh-100 h-100 bg-dark text-light">
      <Header />
      <Container>
        <Row>
          <Col md="8">
            <p>
              <i className="far fa-calendar-check me-2"></i>MEUS AGENDAMENTOS
            </p>
            <Form.Row as={Row} className="mb-3">
              <Form.Text>
                <i className="far fa-filter me-2"></i>FILTROS
              </Form.Text>
            </Form.Row>
            <Form.Row as={Row}>
              <Col md="4" className="mb-3">
                <Form.Control
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </Col>
              <Col md="4" className="mb-3">
                <InputGroup>
                  <label className="input-group-text">
                    <i className="far fa-clock"></i>
                  </label>
                  <select
                    className="form-select bg-light"
                    onChange={(e) => setHour(e.target.value)}
                    value={hour}
                  >
                    <option value="">Selecione...</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                  </select>
                </InputGroup>
              </Col>
              <Col md="4" className="mb-3">
                <select
                  className="form-select bg-light"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value="">Status...</option>
                  <option value={true}>Confirmado</option>
                  <option value={false}>Cancelado</option>
                </select>
              </Col>
            </Form.Row>
            <Form.Row className="mb-3">
              <Button
                size="sm"
                variant="outline-primary"
                onClick={getAllSchedule}
              >
                <i className="far fa-check-circle me-2"></i>APLICAR FILTROS
              </Button>
            </Form.Row>
            {schedule.length > 0 ? (
              <Table striped bordered responsive variant="dark">
                <thead>
                  <tr>
                    <th>DIA</th>
                    <th>HORA</th>
                    <th>STATUS</th>
                    <th>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          {new Date(data.date).toLocaleDateString("pt-br")}
                        </td>
                        <td>{String(data.hour).replace(':00','')}</td>
                        {data.status ? (
                          <td>
                            <span className="text-success">
                              <i className="far fa-check-circle me-2"></i>
                              Confirmado
                            </span>
                          </td>
                        ) : (
                          <td>
                            <span className="text-danger">
                              <i className="far fa-times-circle me-2"></i>
                              Cancelado
                            </span>
                          </td>
                        )}

                        <td>
                          <Link to="/" className="btn btn-danger">
                            <i className="far fa-times-circle me-2"></i>Cancelar
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <p className="text-muted">Nada encontrado :(</p>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
