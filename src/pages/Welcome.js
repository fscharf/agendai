import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <Container
      fluid
      className="welcome-page d-flex justify-content-center align-items-center text-center text-light"
    >
      <Container>
        <Row>
          <Col md="3" className="mx-auto">
            <h2 className="fw-bold brand-title">Barber Shop.</h2>
            <div className="d-grid">
              <span className="fw-bold">Bem-vindo ao Barber Shop!</span>
              <p className="mb-5">Agende seu corte, organize seu tempo!</p>

              <Link to="/signup" className="btn btn-primary mb-3">
                CADASTRE-SE GRÁTIS
              </Link>
              <Link to="/signin" className="btn btn-light text-primary">
                INICIAR SESSÃO
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
