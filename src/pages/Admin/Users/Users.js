import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Context } from "../../../components/Context/AppContext";
import Details from "./Details";

export default function Users() {
  const { userClass } = React.useContext(Context);

  const [state, setState] = useState({
    users: [],
    loading: false,
    query: "",
    isAdmin: null,
    isActive: null,
  });

  const handleGet = () => {
    userClass
      .get({
        query: state.query,
        isAdmin: state.isAdmin,
        isActive: state.isActive,
      })
      .then((res) => {
        setState({ users: res.data, loading: false });
      });
  };

  useEffect(() => {
    setState({ loading: true });
    handleGet();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return state.loading ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    <Card.Body>
      <Card.Title>
        <i className="far fa-users me-2" />
        Usuários
      </Card.Title>
      <hr />
      <Row>
        <Col md className="mb-3">
          <InputGroup>
            <Form.Control
              onChange={handleChange}
              name="query"
              value={state.query}
              placeholder="Digite o nome ou e-mail"
            />
            <Button onClick={handleGet}>
              <i className="far fa-search" />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md="4" className="mb-3">
          <InputGroup>
            <InputGroup.Text>Tipo</InputGroup.Text>

            <select
              className="form-select"
              name="isAdmin"
              value={state.isAdmin}
              onChange={handleChange}
            >
              <option value={true}>Administrador</option>
              <option value={false}>Normal</option>
            </select>
          </InputGroup>
        </Col>
        <Col md="4" className="mb-3">
          <InputGroup>
            <InputGroup.Text>Status</InputGroup.Text>

            <select
              className="form-select"
              name="isActive"
              value={state.isActive}
              onChange={handleChange}
            >
              <option value={true}>Ativo</option>
              <option value={false}>Inativo</option>
            </select>
          </InputGroup>
        </Col>
        <Col md="4" className="mb-3 d-grid">
          <Button
            disabled={state.isAdmin || state.isActive ? false : true}
            onClick={handleGet}
          >
            Aplicar
          </Button>
        </Col>
      </Row>
      <hr />
      <Table responsive striped hover borderless>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.users.length > 0 ? (
            <>
              {state.users.map((data) => {
                return (
                  <tr>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    <td>{data.isActive ? "Ativo" : "Inativo"}</td>
                    <td>{data.isAdmin ? "Administrador" : "Normal"}</td>
                    <td>
                      <Details
                        userKey={data.user_id}
                        actionTitle={<i className="far fa-pen" />}
                      />
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <Card.Text className="text-muted">Nada encontrado :(</Card.Text>
          )}
        </tbody>
      </Table>
      {(state.query || state.isAdmin || state.isActive) && (
        <Card.Link href="#" onClick={() => window.location.reload()}>
          Limpar filtros
        </Card.Link>
      )}
    </Card.Body>
  );
}
