import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import lightIcon from "../assets/img/icon.svg";

class App extends React.Component {
  render() {
    return (
      <div className="welcome-page d-flex justify-content-center align-items-center text-center text-light">
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
                <p className="fw-bold">BEM-VINDO!</p>
                <Link to="/dashboard" className="btn btn-dark">
                  <small>AGENDAR CORTE</small>
                </Link>
                <hr />
                <small className="text-muted">ou</small>
                <hr />
                <Link to="/signup" className="btn btn-primary mb-3">
                  <small>CADASTRE-SE GRÁTIS</small>
                </Link>
                <Link to="/signin" className="btn btn-light text-primary">
                  <small>INICIAR SESSÃO</small>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
