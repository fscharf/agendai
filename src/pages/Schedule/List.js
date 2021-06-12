import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { formatDate, checkDate } from "../../components/Utils/Common";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import ConfirmationToast from "../../components/Toasters/ConfirmationToast";
import ScheduleHour from "./ScheduleHour";
import Accordion from "../../components/Accordion";
import { Context } from "../../components/Context/AppContext";

export default function List() {
  const { scheduleClass, user } = useContext(Context);

  const [state, setState] = useState({
    schedule: [],
    date: null,
    hour: null,
    status: true,
  });

  const getSchedule = () => {
    scheduleClass
      .get({
        userKey: user.user_id,
        date: state.date,
        hour: state.hour,
        status: state.status,
      })
      .then((res) => setState({ schedule: res.data }));
  };

  useEffect(() => {
    getSchedule();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <Layout>
      <HelmetTitle title="Agendamentos" />
      <Form.Text>
        <i className="far fa-calendar-check me-2" />
        Agendamentos
      </Form.Text>
      <p />

      <Accordion
        hidden
        id="Filter"
        className="mb-3"
        title={
          <span>
            <i className="far fa-filter me-2" />
            Filtros
          </span>
        }
      >
        <Form.Row as={Row}>
          <Col md="4" className="mb-3">
            <Form.Control
              type="date"
              name="date"
              onChange={handleChange}
              value={state.date}
            />
          </Col>
          <Col md="4" className="mb-3">
            <ScheduleHour value={state.hour} onChange={handleChange} />
          </Col>
          <Col md="4" className="mb-3">
            <select
              className="form-select"
              onChange={handleChange}
              name="status"
              value={state.status}
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
              onClick={() => getSchedule()}
            >
              <i className="far fa-check-circle me-2" />
              Aplicar filtros
            </Button>
            {state && (
              <Button
                size="sm"
                variant="light"
                onClick={() => window.location.reload()}
              >
                <i className="far fa-brush me-2" />
                Limpar filtros
              </Button>
            )}

            <p />
            <Form.Check
              label={`Mostrar apenas Confirmados`}
              defaultChecked={true}
              checked={state.status}
              onChange={() => {
                setState(!state.status);
              }}
            />
          </Col>
        </Form.Row>
      </Accordion>
      <p className="text-muted">Mostrando apenas os próximos agendamentos.</p>
      {state.schedule.length > 0 ? (
        <>
          <Row>
            {state.schedule.map((data) => {
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
                        key={data.schedule_id}
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
                                    scheduleClass.update({
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
