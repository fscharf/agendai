import { immediateToast } from "izitoast-react";
import React, { useContext, useState } from "react";
import { Card, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../components/Context/AppContext";
import NightMode from "../../components/Layout/NightMode";
import Loading from "../../components/Loading";
import ConfirmationToast from "../../components/Toasters/ConfirmationToast";

export default function Index() {
  const { loading, user, userClass, handleSignOut } = useContext(Context);

  const [state, setState] = useState({
    username: "",
  });

  const handleUpdate = () => {
    userClass.update({ key: user.user_id, username: state.username });
  };

  const disableAccount = () => {
    userClass.update({ key: user.user_id, isActive: false }).then(() => {
      immediateToast("success", {
        title: "Conta desativada com sucesso.",
        message: "Encerrando sessão em 10 segundos...",
        timeout: 0,
      });
      setTimeout(() => handleSignOut(), 10000);
    });
  };

  return (
    <Card.Body>
      <Card.Title>
        <i className="far fa-user-circle me-2" />
        Conta
      </Card.Title>
      <hr />
      <Card.Text className="text-muted">Dados pessoais</Card.Text>

      <Card.Text className="text-start text-sm-end">
        <Form.Row as={Row} className="mb-3">
          <Form.Label column md="3">
            Nome Completo
          </Form.Label>
          <Col md="7">
            <InputGroup>
              {loading ? (
                <Loading className="h-100" />
              ) : (
                <Form.Control
                  type="text"
                  onChange={(e) => setState({ username: e.target.value })}
                  value={state.username || user.username}
                />
              )}

              {state.username && state.username !== user.username && (
                <Button title="Salvar" onClick={() => handleUpdate()}>
                  <i className="far fa-save" />
                </Button>
              )}
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Row as={Row} className="mb-3">
          <Form.Label column md="3">
            Email
          </Form.Label>
          <Col md="7">
            <InputGroup>
              {loading ? (
                <Loading className="h-100" />
              ) : (
                <>
                  <Form.Control disabled type="text" value={user.email} />
                  <Link
                    to="/account/change-email"
                    title="Alterar"
                    className="btn btn-primary"
                  >
                    <i className="far fa-edit" />
                  </Link>
                </>
              )}
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Row as={Row} className="mb-3">
          <Form.Label column md="3">
            Senha
          </Form.Label>
          <Col md="7">
            <InputGroup>
              <Form.Control disabled type="text" value={"**********"} />
              <Link
                to="/account/change-password"
                title="Alterar"
                className="btn btn-primary"
              >
                <i className="far fa-edit" />
              </Link>
            </InputGroup>
          </Col>
        </Form.Row>
      </Card.Text>
      <hr />
      <Card.Text className="text-muted">Opções</Card.Text>
      <Card.Text className="text-start text-sm-end">
        <Form.Row className="mb-3">
          <Form.Row as={Row} className="mb-3">
            <Form.Label column md="3">
              Tema
            </Form.Label>
            <Col md="7 text-start">
              <NightMode />
            </Col>
          </Form.Row>
        </Form.Row>
      </Card.Text>
      <hr />
      <Card.Text className="text-danger">Área de risco</Card.Text>
      <Card.Text>
        <Form.Row as={Row}>
          <Col md="3" />
          <Col md="3" className="mb-3">
            {!user.isAdmin ? (
              <ConfirmationToast variant="danger" onClick={disableAccount}>
                <i className="far fa-user-lock me-2" />
                Desativar conta
              </ConfirmationToast>
            ) : (
              <Button variant="danger" disabled>
                <i className="far fa-user-lock me-2" />
                Desativar conta
              </Button>
            )}
          </Col>
          <Col md="6">
            <Card.Text className="text-muted small">
              Atenção! Se você desativar sua conta, perderá todo histórico de
              agendamentos e não conseguirá recuperar. Mas fique tranquilo, se
              desejar voltar é só clicar em <strong>Esqueci minha senha</strong>{" "}
              na tela de login que sua conta irá reativar automaticamente.
            </Card.Text>
          </Col>
        </Form.Row>
      </Card.Text>
    </Card.Body>
  );
}
