import React, { useEffect, useState } from "react";
import { Card, Spinner, Table } from "react-bootstrap";
import { Context } from "../../../components/Context/AppContext";
import Details from "./Details";
import Filter from "./Filter";

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
    setState({ loading: true });
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

  return (
    <Card.Body>
      <Card.Title>
        <i className="far fa-users me-2" />
        Usuários
      </Card.Title>
      <hr />
      <Filter
        onChange={handleChange}
        onClick={handleGet}
        query={state.query}
        isActive={state.isActive}
        isAdmin={state.isAdmin}
      />
      <hr />
      {state.loading ? (
        <Spinner animation="border" variant="primary" />
      ) : state.users.length > 0 ? (
        <Table variant="light" responsive striped hover borderless>
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
            {state.users && state.users.map((data) => {
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
          </tbody>
        </Table>
      ) : (
        <Card.Text className="text-muted">Nada encontrado :(</Card.Text>
      )}
    </Card.Body>
  );
}
