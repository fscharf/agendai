import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Jumbotron } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { verifyUser } from "../../components/Utils/Common";
import history from "../../services/history";
import HelmetTitle from "../Layout/HelmetTitle";
import Icon from "../Layout/Icon";

export default function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = props.match.params.confirmationCode;

  async function handleSubmit() {
    if (!password || !confirmPassword) {
      return toast.error("Por favor, preencha todos campos.");
    }
    if (password.length < 6) {
      return toast.error("Sua senha deve conter pelo menos 6 caracteres.");
    }
    if (password !== confirmPassword) {
      return toast.error("Senhas não conferem.");
    }
    return await axios
      .put(
        `https://barber-shop-api-2.herokuapp.com/reset-password/${token}`,
        { password: password, isResetPassword: true },
        {
          headers: { "X-Access-Token": token },
        }
      )
      .then(() => {
        toast.success("Senha atualizada com sucesso.");
        return history.push("/signin");
      })
      .catch(() => {
        toast.error("Oops, parece que o código expirou.");
        return history.push("/signin");
      });
  }

  useEffect(() => {
    verifyUser(token);
    //eslint-disable-next-line
  }, []);

  return (
    <Jumbotron
      fluid
      className="d-flex justify-content-center align-items-center text-center vh-100"
    >
      <HelmetTitle title="Mudar senha" />
      <Card className="p-4 p-sm-5" style={{ width: "25rem" }}>
        <Card.Body className="d-grid">
          <Link to="/">
            <Icon width="50" className="mx-auto" />
          </Link>
          <p />
          <Form.Group className="mb-3">
            <Card.Text>
              <strong>Mudar senha</strong>
            </Card.Text>
          </Form.Group>
          <Form.Row className="mb-3">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nova senha"
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar nova senha"
            />
          </Form.Row>
          <Button variant="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Card.Body>
      </Card>
    </Jumbotron>
  );
}
