import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser } from "../../components/Utils/Common";
import { User } from "../../components/Controllers/UserController";
import Layout from "../../components/Layout/Layout";

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
    <Layout>
      <Row>
        <Col md="4">
          <Form.Text>
            <i className="far fa-user-circle me-2" />
            Conta
          </Form.Text>
          <p />
          <div key={users.user_id}>
            <Form.Row className="mb-3">
              <Form.Label className="text-muted">NOME COMPLETO</Form.Label>

              <Form.Control
                readonly
                plaintext
                type="text"
                value={users.username}
              />
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Label className="text-muted">EMAIL</Form.Label>
              <Form.Control
                readonly
                plaintext
                type="text"
                value={users.email}
              />
            </Form.Row>
          </div>
        </Col>
        <Col md="4">
          <Form.Text>Opções</Form.Text>
          <p />
          <div className="text-success mb-3">
            <i className="far fa-check-circle me-2" />
            Conta verificada
          </div>
          <Link className="btn btn-primary btn-sm" to="/change-password">
            <i className="far fa-envelope me-2" />
            Mudar e-mail
          </Link>
          <p />
          <Link className="btn btn-primary btn-sm" to="/change-password">
            <i className="far fa-lock me-2" />
            Mudar senha
          </Link>
          <p />

          
        </Col>
      </Row>
    </Layout>
  );
}
