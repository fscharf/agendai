import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

export default function Filter({
  onClick,
  onChange,
  query,
  isAdmin,
  isActive,
  clearFilter,
}) {
  return (
    <>
      <Row>
        <Col md="6" className="mb-3">
          <InputGroup>
            <Form.Control
              onChange={onChange}
              name="query"
              value={query}
              type="search"
              placeholder="Digite o nome ou e-mail"
            />
            <Button onClick={onClick}>
              <i className="far fa-search" />
            </Button>
          </InputGroup>
        </Col>
        <Col md="3" className="mb-3">
          <select
            className="form-select"
            name="isAdmin"
            value={isAdmin}
            onChange={onChange}
          >
            <option value="">Filtrar por tipo</option>
            <option value={true}>Administrador</option>
            <option value={false}>Normal</option>
          </select>
        </Col>
        <Col md="3" className="mb-3">
          <select
            className="form-select"
            name="isActive"
            value={isActive}
            onChange={onChange}
          >
            <option value="">Filtrar por status</option>
            <option value={true}>Ativo</option>
            <option value={false}>Inativo</option>
          </select>
        </Col>
      </Row>

      <Row>
        <Col md className="mb-3">
          <InputGroup>
            <Button variant="link" onClick={onClick}>
              <i className="far fa-filter me-2" />
              Aplicar filtros
            </Button>

            <Button variant="link" onClick={clearFilter}>
              <i className="far fa-sync me-2" />
              Recarregar página
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
}
