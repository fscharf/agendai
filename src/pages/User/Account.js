import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header, { user } from "../../components/Header";

export default function Account() {
  return (
    <Container className="bg-dark vh-100 h-100 text-light" fluid>
      <Header />
      <Container>
        <Row>
          <Col md="8">
            <p>
              <i className="far fa-user-circle me-2"></i>MINHA CONTA
            </p>

            <Form method="POST" noValidate>
              <Form.Row as={Row}>
                <Col md="6" className="mb-3">
                  <Form.Label className="text-muted">NOME COMPLETO</Form.Label>
                  <Form.Control disabled type="text" value={user.name} />
                </Col>
                <Col md="6" className="mb-3">
                  <Form.Label className="text-muted">EMAIL</Form.Label>
                  <Form.Control disabled type="text" value={user.email} />
                </Col>
                <Col md="12" className="mb-3">
                  <Form.Label className="text-muted">ENDEREÇO</Form.Label>
                  <Form.Control disabled type="text" value={user.address} />
                </Col>
                <Col md="4" className="mb-3">
                  <Form.Label className="text-muted">CEP</Form.Label>
                  <Form.Control disabled type="text" value={user.postal_code} />
                </Col>
                <Col md="4" className="mb-3">
                  <Form.Label className="text-muted">BAIRRO</Form.Label>
                  <Form.Control disabled type="text" value={user.district} />
                </Col>
                <Col md="4" className="mb-3">
                  <Form.Label className="text-muted">CIDADE</Form.Label>
                  <Form.Control disabled type="text" value={user.city} />
                </Col>
                <Col md="12" className="mb-3">
                  <Form.Label className="text-muted">TELEFONE(S)</Form.Label>
                  <Form.Row as={Row}>
                    <Col md="6" className="mb-3">
                      <Form.Control disabled type="text" value={user.phone1} />
                    </Col>
                    <Col md="6">
                      <Form.Control disabled type="text" value={user.phone2} />
                    </Col>
                  </Form.Row>
                </Col>
              </Form.Row>
              <Form.Row>
                <Button variant="primary">
                  <i className="far fa-edit me-2"></i>EDITAR DADOS
                </Button>
              </Form.Row>
            </Form>
          </Col>
          <Col md="4">
            <p>MAIS OPÇÕES</p>
            {!user.account_verified && (
              <div className="text-danger mb-3">
                <i className="far fa-times-circle me-2"></i>CONTA NÃO VERIFICADA
                <br />
                <Link to="/" className="small">
                  Enviar e-mail de confirmação{" "}
                  <i className="far fa-arrow-alt-right"></i>
                </Link>
              </div>
            )}
            {user.account_verified && (
              <div className="text-success mb-3">
                <i className="far fa-check-circle me-2"></i>CONTA VERIFICADA
              </div>
            )}
            <Link className="btn btn-primary btn-sm" to="/dashboard">
              <i className="far fa-lock me-2"></i>TROCAR SENHA
            </Link>
            <p />
            <Link className="btn btn-primary btn-sm" to="/settings">
              <i className="far fa-cog me-2"></i>CONFIGURAÇÕES
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
