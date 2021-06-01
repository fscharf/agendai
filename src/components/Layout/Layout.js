import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import Header from "../Header";

export default function Layout({ children }) {
  return (
    <Jumbotron fluid>
      <Header />
      <Container fluid className="py-5 bg-white">
        <Container>
          <Row className="mb-3">
            <Col>{children}</Col>
          </Row>
        </Container>
      </Container>
    </Jumbotron>
  );
}
