import { immediateToast } from "izitoast-react";
import React, { useEffect } from "react";
import { Card, Col, Container, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { verifyUser } from "../../components/Utils/Common";
import history from "../../services/history";

export default function Confirmation(props) {
  useEffect(() => {
    verifyUser(props.match.params.confirmationCode);
    immediateToast("show", {
      title: "Você será direcionado em 10 segundos.",
      timeout: 10000,
    });
    setTimeout(() => history.push("/signin"), 10000);
  });

  if (props.match.path === "/confirm/:confirmationCode") {
    return (
      <Jumbotron
        fluid
        className="d-flex justify-content-center bg-primary align-items-center text-center vh-100"
      >
        <Container>
          <Row>
            <Col md="4" className="mx-auto">
              <Card className="p-5">
                <i className="far fa-check-circle mb-3 fa-3x text-success" />
                <Card.Title className="text-success mb-3">
                  Conta confirmada!
                </Card.Title>
                <Card.Text className="text-muted">
                  Parabéns, agora você pode acessar sua conta a hora que quiser.
                </Card.Text>
                <Link to="/signin" className="btn btn-primary">
                  INICIAR SESSÃO
                </Link>
              </Card>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  } else {
    return history.push("/signin");
  }
}
