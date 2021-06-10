import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Context } from "../../../components/Context/AppContext";
import Details from "./Details";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userClass } = React.useContext(Context);

  useEffect(() => {
    setLoading(true);
    userClass.getUsers().then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    <Card.Body>
      <Card.Title>
        <i className="far fa-users me-2" />
        Usuários
      </Card.Title>
      <hr />
      <Row>
        <Col md="6" className="mb-3">
          <InputGroup>
            <FormControl placeholder="Pesquisar..." />
            <Button>
              <i className="far fa-search" />
            </Button>
          </InputGroup>
        </Col>
      </Row>
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
          {users.map((data) => {
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
    </Card.Body>
  );
}
