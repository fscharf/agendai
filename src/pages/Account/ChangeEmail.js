import React, { useContext, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { Context } from "../../components/Context/AppContext";
import { immediateToast } from "izitoast-react";

export default function ChangeEmail() {
  const { handleSignOut, user, userClass } = useContext(Context);
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      return immediateToast("error", {
        title: "Por favor, preencha todos os campos.",
      });
    }

    if (email === user.email) {
      return immediateToast("error", {
        title: "E-mail não pode ser igual ao e-mail atual.",
      });
    }

    userClass
      .update({ key: user.user_id, email: email })
      .then(() => {
        immediateToast("success", {
          title: "E-mail atualizado.",
          message:
            "Por favor, cheque sua conta, sua sessão será encerrada em 10 segundos.",
        });

        setTimeout(handleSignOut(), 10000);
      })
      .catch((err) => {
        immediateToast("error", { title: err.response.data.message });
      });
  };

  const title = "Alterar email";

  return (
    <Card.Body>
      <HelmetTitle title={title} />
      <Card.Title>
        <i className="far fa-envelope me-2"></i>{title}
      </Card.Title>
      <hr />
      <Row>
        <Col md="6">
          <Form.Row className="mb-3">
            <Form.Label>Novo email</Form.Label>
            <Form.Control
              type="email"
              placeholder="e.g. meuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Row>
          <Form.Row>
            <Button variant="primary" onClick={() => handleSubmit()}>
              Enviar
            </Button>
          </Form.Row>
        </Col>
      </Row>
    </Card.Body>
  );
}
