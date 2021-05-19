import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { user } from "../../components/Controllers/UserController";
import { handleSignOut } from "../../components/Utils/Common";

export default function ConfirmAccount() {
  const title = "Confirme sua conta para continuar";
  return (
    <Container
      fluid
      className="bg-dark justify-content-center d-flex align-items-center text-center text-light vh-100"
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container>
        <Row>
          <Col md="6" className="mx-auto">
            <p className="far fa-times-circle fa-6x text-danger"></p>
            <h4>Oops, parece que sua conta ainda não foi ativada.</h4>
            <p>
              Enviado um e-mail de confirmação para:{" "}
              <strong>{user.email}</strong>
            </p>
            <Link to="/">Enviar novo e-mail de confirmação</Link> <br />
            <Link to="" onClick={handleSignOut}>
              Sair
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
