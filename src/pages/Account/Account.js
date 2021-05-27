import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import toast from "react-hot-toast";
import { getUser } from "../../components/Utils/Common";
import { User } from "../../components/Controllers/UserController";

export default function Account() {
  const [users, setUserInfo] = useState([]);
  const user = getUser();
  const fields = new User();

  useEffect(() => {
    function getUserById() {
      fields
        .getUserById({ userKey: user.user_id })
        .then((res) => {
          return setUserInfo(res.data);
        })
        .catch((err) => {
          return toast.error(err);
        });
    }

    getUserById();
    //eslint-disable-next-line
  }, []);

  return (
    <Jumbotron fluid>
      <Header />
      <Container>
        <Row>
          <Col md="8" className="mx-auto">
            <Card className="p-5">
              <Row>
                <Col md="8">
                  <Card.Text>
                    <i className="far fa-user-circle me-2" />
                    MINHA CONTA
                  </Card.Text>
                  <div key={users.user_id}>
                    <Form.Row className="mb-3">
                      <Form.Label className="text-muted">
                        NOME COMPLETO
                      </Form.Label>

                      <Form.Control
                        readonly
                        type="text"
                        value={users.username}
                      />
                    </Form.Row>
                    <Form.Row className="mb-3">
                      <Form.Label className="text-muted">EMAIL</Form.Label>
                      <Form.Control readonly type="text" value={users.email} />
                    </Form.Row>
                  </div>
                </Col>
                <Col md="4">
                  <p>OPÇÕES</p>
                  {!user.accountVerified ? (
                    <div className="text-danger mb-3">
                      <i className="far fa-times-circle me-2" />
                      Conta não verificada
                      <br />
                      <Link to="/" className="small">
                        Enviar e-mail de confirmação{" "}
                        <i className="far fa-arrow-alt-right" />
                      </Link>
                    </div>
                  ) : (
                    <div className="text-success mb-3">
                      <i className="far fa-check-circle me-2" />
                      Conta verificada
                    </div>
                  )}
                  <Link
                    className="btn btn-primary btn-sm"
                    to="/change-password"
                  >
                    <i className="far fa-envelope me-2" />
                    TROCAR EMAIL
                  </Link>
                  <p />
                  <Link
                    className="btn btn-primary btn-sm"
                    to="/change-password"
                  >
                    <i className="far fa-lock me-2" />
                    TROCAR SENHA
                  </Link>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}
