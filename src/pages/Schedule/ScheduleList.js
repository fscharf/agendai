import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Jumbotron,
  Row,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { getUser } from "../../components/Utils/Common";
import { formatDate } from "../../components/Utils/Utils";
import Header from "../../components/Header";
import { confirmationToast } from "../../components/Controllers/ScheduleController";
import api from "../../services/api";

export default function ScheduleList() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [status, setStatus] = useState(true);
  const user = getUser();

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
    <Jumbotron fluid className="vh-100 bg-light">
      <Header />
      <Container>
        <Row>
          <Col md="8" className="mx-auto">
            <Card className="p-5 mb-3">
              <Card.Text>
                <i className="far fa-calendar-check me-2" />
                MEUS AGENDAMENTOS
              </Card.Text>
              <Form.Row className="mb-3">
                <Button
                  size="sm"
                  variant="secondary"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilters"
                >
                  <i className="far fa-filter me-2" />
                  FILTROS
                  <i className="far fa-chevron-down ms-2" />
                </Button>
              </Form.Row>
              <div className="collapse" id="collapseFilters">
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
                        <i className="far fa-clock" />
                      </label>
                      <select
                        className="form-select"
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
                      className="form-select"
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option value="">Status...</option>
                      <option value={true}>Confirmado</option>
                      <option value={false}>Cancelado</option>
                    </select>
                  </Col>
                </Form.Row>
                <Form.Row as={Row} className="mb-3">
                  <Col md="4 d-grid" className="mb-3">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={getAllSchedule}
                    >
                      <i className="far fa-check-circle me-2" />
                      APLICAR FILTROS
                    </Button>
                  </Col>
                  <Col md="4 d-grid" className="mb-3">
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => window.location.reload()}
                    >
                      <i className="far fa-brush me-2" />
                      LIMPAR FILTROS
                    </Button>
                  </Col>
                  <Col md="4 d-grid" className="mb-3">
                    <Form.Check
                      label={`Mostrar apenas Confirmados`}
                      defaultChecked={true}
                      checked={status}
                      onChange={() => {
                        setStatus(!status);
                      }}
                    />
                  </Col>
                </Form.Row>
              </div>
              {schedule.length > 0 ? (
                <>
                  <Row>
                    {schedule.map((data, key) => {
                      return (
                        <Col md="4">
                          <Card
                            className={`p-3 mb-3 ${
                              data.status
                                ? "border border-success"
                                : "border border-danger"
                            }`}
                            key={key}
                          >
                            <Card.Text className="fw-bold">
                              <Card.Text>
                                <i className="far fa-calendar-alt me-2" />
                                {formatDate(data.date)}
                                &nbsp;&middot;&nbsp;
                                <i className="far fa-clock me-2" />
                                {String(data.hour).replace(":00", "")}
                              </Card.Text>
                            </Card.Text>

                            {data.status ? (
                              <>
                                <Card.Text className="text-success">
                                  <i className="far fa-check-circle me-2" />
                                  Confirmado
                                </Card.Text>
                                <Dropdown>
                                  <Dropdown.Toggle size="sm">
                                    Opções
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() =>
                                        confirmationToast(data.schedule_id)
                                      }
                                    >
                                      Cancelar
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </>
                            ) : (
                              <Card.Text className="text-danger">
                                <i className="far fa-times-circle me-2" />
                                Cancelado
                              </Card.Text>
                            )}
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </>
              ) : (
                <p className="text-muted">Nada encontrado :(</p>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}
