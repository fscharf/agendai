import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Header from "../../components/Header";

export default function Schedule() {
  return (
    <Container className="bg-dark vh-100 h-100 text-light" fluid>
      <Header />
      <Container>
        <Row>
          <Col md="8">
            <p>
              <i className="far fa-calendar-plus me-2"></i>NOVO AGENDAMENTO
            </p>
            <Form method="POST">
              <Form.Row as={Row}>
                <Col md="6">
                  <Form.Row className="mb-3">
                    <Form.Label>Escolha uma data</Form.Label>
                    <Form.Control type="date" name="date" />
                  </Form.Row>
                  <Form.Row className="mb-3">
                    <Form.Label>Escolha um horário</Form.Label>
                    <select
                      className="mr-sm-2 form-select bg-light"
                      id="inlineFormCustomSelect"
                      name="hour"
                    >
                      <option value="0">Selecione...</option>
                      <option value="1">09:00</option>
                      <option value="2">10:00</option>
                      <option value="3">11:00</option>
                      <option value="4">12:00</option>
                      <option value="5">14:00</option>
                      <option value="6">15:00</option>
                      <option value="7">16:00</option>
                      <option value="8">17:00</option>
                      <option value="9">18:00</option>
                    </select>
                  </Form.Row>
                  <Form.Row className="d-grid">
                    <Button type="submit" className="btn btn-primary">
                      <i className="far fa-check-circle me-2"></i>CONFIRMAR
                    </Button>
                  </Form.Row>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
