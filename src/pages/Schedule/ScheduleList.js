import React from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function ScheduleList() {
  return (
    <Container fluid className="vh-100 bg-dark text-light">
      <Header />
      <Container>
        <Row>
          <Col md="8">
            <p>
              <i className="far fa-calendar-check me-2"></i>MEUS AGENDAMENTOS
            </p>
            <Form method="GET" className="mb-3">
              <Form.Row as={Row} className="mb-3">
                <Form.Text>
                  <i className="far fa-filter me-2"></i>FILTROS
                </Form.Text>
              </Form.Row>
              <Form.Row as={Row}>
                <Col md="4" className="mb-3">
                  <Form.Control type="date" name="date" />
                </Col>
                <Col md="4" className="mb-3">
                  <Form.Control type="time" name="hour" />
                </Col>
                <Col md="4" className="mb-3">
                  <select className="form-select bg-light" name="status">
                    <option value="0">Status...</option>
                    <option value="0">Concluído</option>
                    <option value="0">Cancelado</option>
                    <option value="0">Em andamento</option>
                  </select>
                </Col>
              </Form.Row>
              <Form.Row>
                <Button size="sm" variant="outline-primary" type="submit">
                  <i className="far fa-check-circle me-2"></i>APLICAR FILTROS
                </Button>
              </Form.Row>
            </Form>
            <Table striped responsive bordered hover variant="dark">
              <thead>
                <tr>
                  <th>DIA</th>
                  <th>HORA</th>
                  <th>STATUS</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12/05/2021</td>
                  <td>10:00</td>
                  <td>
                    <span className="text-success">
                      <i className="far fa-check-circle me-2"></i>Concluído
                    </span>
                  </td>
                  <td>
                    {" "}
                    <Link
                      to="/dashboard"
                      className="text-danger"
                      title="Cancelar"
                    >
                      <i className="far fa-times-circle me-2"></i>Cancelar
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>12/05/2021</td>
                  <td>10:00</td>
                  <td>
                    <span className="text-danger">
                      <i className="far fa-times-circle me-2"></i>Cancelado
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span className="text-muted">
                      <i className="far fa-times-circle me-2"></i>Cancelar
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>15/05/2021</td>
                  <td>10:00</td>
                  <td>
                    <span className="text-primary">
                      <i className="far fa-clock me-2"></i>Em Andamento
                    </span>
                  </td>
                  <td>
                    <Link
                      to="/dashboard"
                      className="text-danger"
                      title="Cancelar"
                    >
                      <i className="far fa-times-circle me-2"></i>Cancelar
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
