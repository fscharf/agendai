import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { formatDate } from "../../../components/Utils/Common";
import api from "../../../services/api";

export default function Schedule() {
  const [state, setState] = useState({
    schedule: [],
    users: [],
    loading: false,
  });

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

  return (
    <Card.Body>
      <Card.Title>
        <i className="far fa-calendar-alt me-2" />
        Agendamentos
      </Card.Title>
      <hr />
      {state.loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
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
      )}
    </Card.Body>
  );
}
