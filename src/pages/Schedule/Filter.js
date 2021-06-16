import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

export default function Filter({ onChange, onClick, date, status }) {
  return (
    <Row>
      <Col md className="mb-3">
        <Form.Control
          type="date"
          name="date"
          onChange={onChange}
          value={date}
        />
      </Col>
      <Col md className="mb-3">
        <InputGroup>
          <InputGroup.Text className="far fa-calendar-check" />
          <select
            className="form-select"
            name="status"
            value={status}
            onChange={onChange}
          >
            <option value="">Selecione...</option>
            <option value={true}>Confirmado</option>
            <option value={false}>Cancelado</option>
          </select>
        </InputGroup>
      </Col>
      <Col md className="mb-3">
        <Button variant="primary" className="me-2" onClick={onClick}>
          Aplicar filtros
        </Button>
        <Button variant="link" onClick={() => window.location.reload()}>
          Limpar filtros
        </Button>
      </Col>
    </Row>
  );
}
