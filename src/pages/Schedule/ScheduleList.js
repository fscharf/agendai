import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { getUser, formatDate, checkDate } from "../../components/Utils/Common";
import { Schedule } from "../../components/Controllers/ScheduleController";
import Layout from "../../components/Layout/Layout";
import ConfirmationToast from "../../components/ConfirmationToast";
import ScheduleHour from "./ScheduleHour";

export default function ScheduleList() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [status, setStatus] = useState(true);
  const fields = new Schedule();
  const user = getUser();

  const getScheduleList = () => {
    fields
      .getSchedule({
        userKey: user.user_id,
        date: date,
        hour: hour,
        status: status,
      })
      .then((res) => setSchedule(res.data))
      .catch((err) => toast.error(err.response.data.message));
  };

  useEffect(() => {
    getScheduleList();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Form.Text>
        <i className="far fa-calendar-check me-2" />
        Agendamentos
      </Form.Text>
      <p />
      <Form.Row className="mb-3">
        <Button
          size="sm"
          variant="secondary"
          data-bs-toggle="collapse"
          data-bs-target="#collapseFilters"
        >
          <i className="far fa-filter me-2" />
          Filtros
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
            <ScheduleHour
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            />
          </Col>
          <Col md="4" className="mb-3">
            <select
              className="form-select"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="">Todos</option>
              <option value={true}>Confirmado</option>
              <option value={false}>Cancelado</option>
            </select>
          </Col>
        </Form.Row>
        <Form.Row as={Row} className="mb-3">
          <Col className="mb-3">
            <Button
              size="sm"
              variant="primary"
              className="me-2"
              onClick={() => getScheduleList()}
            >
              <i className="far fa-check-circle me-2" />
              Aplicar filtros
            </Button>
            <Button
              size="sm"
              variant="light"
              onClick={() => window.location.reload()}
            >
              <i className="far fa-brush me-2" />
              Limpar filtros
            </Button>
            <p />
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
      <p className="text-muted">Mostrando apenas os próximos agendamentos.</p>
      {schedule.length > 0 ? (
        <>
          <Row>
            {schedule.map((data, key) => {
              return (
                <>
                  {checkDate(data.date) >= checkDate() && (
                    <Col md="3">
                      <Card
                        className={`mb-3 ${
                          data.status
                            ? "border border-success"
                            : "border border-danger"
                        }`}
                        key={key}
                      >
                        <>
                          <Card.Header className="fw-bold">
                            <i className="far fa-calendar-alt me-2" />
                            {formatDate(data.date)}
                            &nbsp;&middot;&nbsp;
                            <i className="far fa-clock me-2" />
                            {String(data.hour).replace(":00", "")}
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>{data.description}</Card.Text>
                            {data.status ? (
                              <>
                                <Card.Text className="text-success">
                                  <i className="far fa-check-circle me-2" />
                                  Confirmado
                                </Card.Text>
                                <ConfirmationToast
                                  onClick={() =>
                                    fields.updateSchedule({
                                      key: data.schedule_id,
                                      status: !data.status,
                                    })
                                  }
                                  variant="light"
                                  actionTitle="Cancelar"
                                />
                              </>
                            ) : (
                              <Card.Text className="text-danger">
                                <i className="far fa-times-circle me-2" />
                                Cancelado
                              </Card.Text>
                            )}
                          </Card.Body>
                        </>
                      </Card>
                    </Col>
                  )}
                </>
              );
            })}
          </Row>
        </>
      ) : (
        <p className="text-muted">Oops, nada encontrado.</p>
      )}
    </Layout>
  );
}
