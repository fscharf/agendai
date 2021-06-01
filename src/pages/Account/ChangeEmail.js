import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { getUser, handleSignOut } from "../../components/Utils/Common";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { User } from "../../components/Controllers/UserController";
import toast from "react-hot-toast";

export default function ChangeEmail() {
  const [email, setEmail] = useState("");
  const user = getUser();
  const userData = new User();
  const key = user.user_id;

  const emailExists = () => {
    userData.getUsers({
      email: user.email,
    });
  };

  async function handleSubmit() {
    if (!email) {
      return toast.error("Por favor, preencha todos os campos.");
    }

    if (email === user.email) {
      return toast.error("E-mail não pode ser igual ao e-mail atual.");
    }

    if (emailExists()) {
      return toast.error("E-mail já utilizado.");
    }

    userData
      .updateUser({ userKey: key, email: email })
      .then(() => {
        handleSignOut();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <Layout>
      <HelmetTitle title="Mudar email" />
      <Row>
        <Col md="4">
          <p>
            <Link to="/account" title="Voltar">
              <i className="far fa-arrow-left"></i>
            </Link>
            <i className="far fa-envelope ms-3 me-2"></i>Mudar email
          </p>
          <Form.Row className="mb-3">
            <Form.Label>Novo email</Form.Label>
            <Form.Control
              type="email"
              placeholder="e.g. meuemail@exemplo.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Row>
          <Form.Row className="d-grid mb-3">
            <Button variant="primary" onClick={() => handleSubmit()}>
              Enviar
            </Button>
          </Form.Row>
        </Col>
      </Row>
    </Layout>
  );
}
