import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { formatDate } from "../../../components/Utils/Common";
import api from "../../../services/api";
import Filter from "./Filter";


export default function Schedule() {
  const [state, setState] = useState({
    schedule: [],
    users: [],
    loading: false,
    date: new Date(),
    username: null,
    status: true,
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
      <hr />
      <Filter
        date={state.date}
        username={state.username}
        status={state.status}
        onChange={handleChange}
        onClick={() => query()}
      />
      <hr />
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
