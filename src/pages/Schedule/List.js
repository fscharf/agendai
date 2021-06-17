import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { formatDate, checkDate } from "../../components/Utils/Common";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import ConfirmationToast from "../../components/Toasters/ConfirmationToast";
import { Context } from "../../components/Context/AppContext";
import Filter from "./Filter";
import NewSchedule from "./NewSchedule";

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
    setState({ loading: true });

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
      <Row>
        <Col md="6" className="mb-3">
          <h5>
            <i className="far fa-calendar-check me-2" />
            Agendamentos
          </h5>
        </Col>
        <Col md className="text-start text-sm-end">
          <NewSchedule>
            <i className="far fa-calendar-plus me-2" />Agendar
          </NewSchedule>
        </Col>
      </Row>
      <br />
      <Filter
        date={state.date}
        status={state.status}
        onChange={handleChange}
        onClick={getSchedule}
      />
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
                {state.schedule &&
                  state.schedule.map((data) => {
                    return (
                      <>
                        {checkDate(data.date) >= checkDate() &&
                          data.user_id === user.user_id && (
                            <Col md="3">
                              <Card
                                className={`mb-3 ${
                                  data.status
                                    ? "border border-success"
                                    : "border border-danger"
                                }`}
                                key={data.schedule_id}
                              >
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
