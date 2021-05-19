import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import lightIcon from "../assets/img/icon.svg";

export default function Welcome() {
  return (
    <Container
      fluid
      className="welcome-page d-flex justify-content-center align-items-center text-center text-light"
    >
      <Container>
        <Row>
          <Col md="3" className="mx-auto">
            <img
              src={lightIcon}
              alt="icon"
              width="150"
              className="img-fluid mb-3"
            />
            <div className="d-grid">
              <h4 className="fw-bold">Bem-vindo ao Barber Shop!</h4>
              <p>Agende seu corte, organize seu tempo!</p>

              <Link to="/signup" className="btn btn-primary mb-3">
                CADASTRE-SE GRÁTIS
              </Link>
              <Link to="/signin" className="btn btn-dark">
                INICIAR SESSÃO
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
