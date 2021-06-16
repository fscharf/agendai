import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

export default function Filter({ date, username, status, onChange, onClick }) {
  return (
    <Row>
      <Col md="5" className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Pesquisar nome do usuário"
            name="username"
            value={username}
            onChange={onChange}
          />
          <Button onClick={onClick}>
            <i className="far fa-search" />
          </Button>
        </InputGroup>
      </Col>
      <Col md className="mb-3">
        <InputGroup>
          <InputGroup.Text className="far fa-calendar-alt" />
          <Form.Control name="date" type="date" value={date} onChange={onChange} />
        </InputGroup>
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
    </Row>
  );
}
