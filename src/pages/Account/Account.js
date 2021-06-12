import React from "react";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { Card, Col, Nav, Row } from "react-bootstrap";
import Accordion from "../../components/Accordion";
import PrivateRoute from "../../components/Utils/PrivateRoute";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import Index from "./Index";

export default function Account() {
  const title = "Conta";
  let { path, url } = useRouteMatch();

  return (
    <Layout>
      <HelmetTitle title={title} />
      <p>
        <i className="far fa-user-circle me-2" />
        {title}
      </p>
      <Row>
        <Col md="3" className="mb-3">
          <Accordion title="Menu" id="Index">
            <Nav variant="pills" className="flex-column" defaultActiveKey={url}>
              <NavLink className="nav-link" exact to={url}>
                <i className="far fa-user-circle me-2" />
                {title}
              </NavLink>

              <NavLink className="nav-link" to={`${url}/change-email`}>
                <i className="far fa-envelope me-2" />
                Alterar e-mail
              </NavLink>
              <NavLink className="nav-link" to={`${url}/change-password`}>
                <i className="far fa-lock me-2" />
                Alterar senha
              </NavLink>
            </Nav>
          </Accordion>
        </Col>
        <Col md="9">
          <Card>
            <Card.Body>
              <Switch>
                <PrivateRoute exact path={`${path}`} component={Index} />
                <PrivateRoute
                  path={`${path}/change-email`}
                  component={ChangeEmail}
                />
                <PrivateRoute
                  path={`${path}/change-password`}
                  component={ChangePassword}
                />
              </Switch>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
