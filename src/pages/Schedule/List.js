import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { formatDate, checkDate } from "../../components/Utils/Common";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import ConfirmationToast from "../../components/Toasters/ConfirmationToast";
import { Context } from "../../components/Context/AppContext";

export default function List() {
  const { scheduleClass, user } = useContext(Context);

  const [state, setState] = useState({
    schedule: [],
    date: null,
    hour: null,
    status: true,
    loading: false,
  });

  const getSchedule = () => {
    scheduleClass
      .get({
        userKey: user.user_id,
        date: state.date,
        hour: state.hour,
        status: state.status,
      })
      .then((res) => setState({ schedule: res.data, loading: false }));
  };

  useEffect(() => {
    setState({ loading: true });
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
      <Form.Label>
        <i className="far fa-calendar-check me-2" />
        Agendamentos
      </Form.Label>
      <hr />
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
        <Col className="mb-3">
          <Button
            variant="primary"
            className="me-2"
            onClick={() => getSchedule()}
          >
            <i className="far fa-check-circle me-2" />
            Aplicar filtros
          </Button>
          <Button variant="link" onClick={() => window.location.reload()}>
            <i className="far fa-brush me-2" />
            Limpar filtros
          </Button>
        </Col>
      </Form.Row>
      {state.loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
          {state.schedule && state.schedule.length > 0 ? (
            <>
              <p className="text-muted">
                Mostrando apenas os próximos agendamentos.
              </p>
              <Row>
                {state.schedule.map((data) => {
                  return (
                    <>
                      {checkDate(data.date) >= checkDate() &&
                        data.user_id ===
                          user.user_id && (
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
                                  <Card.Header className="fw-bold py-3">
                                    <i className="far fa-calendar-alt me-2" />
                                    {formatDate(data.date)}
                                    &nbsp;&middot;&nbsp;
                                    <i className="far fa-clock me-2" />
                                    {String(data.hour).replace(":00", "")}
                                  </Card.Header>
                                  <Card.Body>
                                    <small className="text-muted">
                                      Atendimento
                                    </small>
                                    <Card.Text>{data.description}</Card.Text>
                                    <small className="text-muted">Status</small>
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
        </>
      )}
    </Layout>
  );
}
