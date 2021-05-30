import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Header from "../Header";

export default function Layout({ children }, props) {
  return (
    <Jumbotron fluid>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <Container>
        <Row className="mb-3">
          <Col>{children}</Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}
