import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import welcomeImg from "../assets/img/undraw_date_picker_gorr.svg";

export default function Welcome() {
  return (
    <Layout>
      <Row>
        <Col md="4" className="my-auto ms-auto">
          <h2 className="fw-bold">Organize seu tempo!</h2>
          <h4 className="text-muted">
            No Agendaí, você agenda seu atendimento muito mais fácil e rápido.
          </h4>
          <p/>
          <Link className="btn btn-dark" to="/signup">
            Cadastre-se agora! É grátis.
          </Link>
        </Col>
        <Col md="6" className="mx-auto my-auto d-none d-sm-block">
          <img src={welcomeImg} className="img-fluid" alt="" width="500" />
        </Col>
      </Row>
    </Layout>
  );
}
