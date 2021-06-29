import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { formatDate } from "../../../components/Utils/Common";
import api from "../../../services/api";
import Details from "./Details";
import Filter from "./Filter";
import ConfirmationToast from "../../../components/Toasters/ConfirmationToast";
import { immediateToast } from "izitoast-react";

export default function Schedule() {
  const [state, setState] = useState({
    schedule: [],
    users: [],
    loading: false,
    date: new Date(),
    username: null,
    status: true,
    rotate: 0,
  });

  const query = () => {
    setState({ loading: true });
    axios
      .all([
        api.get("/schedule", {
          params: { status: state.status, date: state.date },
        }),
        api.get("/users", {
          params: {
            query: state.username,
          },
        }),
      ])
      .then(
        axios.spread((schedule, users) => {
          setState({
            schedule: schedule.data,
            users: users.data,
            loading: false,
          });
        })
      );
  };

  const destroy = (key) => {
    api
      .delete(`/schedule/${key}`)
      .then((res) => immediateToast("success", { title: res.data.message }))
      .catch((err) =>
        immediateToast("error", { title: err.response.data.message })
      );
  };

  useEffect(() => {
    setState({ loading: true });
    axios.all([api.get("/schedule"), api.get("/users")]).then(
      axios.spread((schedule, users) => {
        setState({
          schedule: schedule.data,
          users: users.data,
          loading: false,
        });
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

  return (
    <Card.Body>
      <Card.Title>
        <i className="far fa-calendar-alt me-2" />
        Agendamentos
      </Card.Title>
      <br />
      <Filter
        date={state.date}
        username={state.username}
        status={state.status}
        onChange={handleChange}
        onClick={() => query()}
      />
      <br />
      {state.loading ? (
        <Spinner animation="border" variant="primary" />
      ) : state.schedule &&
        state.schedule.length > 0 &&
        state.users &&
        state.users.length > 0 ? (
        <Row>
          <Col md>
            <Table variant="light" responsive striped hover borderless>
              <caption>Mostrando os próximos agendamentos.</caption>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {state.users &&
                  state.users.map((users) => {
                    return (
                      <>
                        {state.schedule &&
                          state.schedule.map((schedule) => {
                            return (
                              <>
                                {users.user_id === schedule.user_id && (
                                  <tr>
                                    <td>{users.username}</td>
                                    <td>{formatDate(schedule.date)}</td>
                                    <td>{schedule.hour}</td>
                                    <td>
                                      {schedule.status
                                        ? "Confirmado"
                                        : "Cancelado"}
                                    </td>
                                    <td>
                                      <Details
                                        title="Editar"
                                        schedule={schedule}
                                        users={users}
                                        className="me-2"
                                      />
                                      <ConfirmationToast
                                        variant="danger"
                                        actionTitle={
                                          <i className="far fa-trash" />
                                        }
                                        onClick={() =>
                                          destroy(schedule.schedule_id)
                                        }
                                        message="Se você continuar, apagará os dados permanentemente e não poderá recuperar."
                                      />
                                    </td>
                                  </tr>
                                )}
                              </>
                            );
                          })}
                      </>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <span className="text-muted">Nada encontrado :(</span>
      )}
    </Card.Body>
  );
}
