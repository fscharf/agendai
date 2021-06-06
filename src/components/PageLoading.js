import React from "react";
import { Container, Spinner } from "react-bootstrap";

export default function PageLoading() {
  return (
    <Container
      className="vh-100 d-flex justify-content-center align-items-center"
      fluid
    >
      <Spinner
        style={{ width: "5rem", height: "5rem" }}
        animation="border"
        role="status"
        variant="primary"
      >
        <span className="sr-only">Carregando...</span>
      </Spinner>
    </Container>
  );
}
