import React from "react";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import AdminRoute from "../../components/Utils/AdminRoute";
import { Card, Col, Nav, Row } from "react-bootstrap";
import Dashboard from "./Dashboard";
import Accordion from "../../components/Accordion";
import ScheduleHour from "./Schedule/ScheduleHour";
import Users from "./Users/Users";
import ScheduleAtt from "./Schedule/ScheduleAtt";
import Schedule from "./Schedule/Schedule";

export default function Admin() {
  const title = "Painel Administrativo";
  let { path, url } = useRouteMatch();

  return (
    <Layout>
      <HelmetTitle title={title} />
      <p>
        <i className="far fa-sliders-h me-2" />
        {title}
      </p>
      <hr />
      <Row>
        <Col md="3" className="mb-3">
          <Accordion title="Menu" id="Index">
            <Nav variant="pills" className="flex-column" defaultActiveKey={url}>
              <NavLink className="nav-link" exact to={url}>
                <i className="far fa-sliders-h me-2" />
                Painel
              </NavLink>
              <NavLink className="nav-link" to={`${url}/schedule`}>
                <i className="far fa-calendar-alt me-2" />
                Agendamentos
              </NavLink>
              <NavLink className="nav-link" to={`${url}/users`}>
                <i className="far fa-users me-2" />
                Usuários
              </NavLink>
              <NavLink className="nav-link" to={`${url}/schedule-hour`}>
                <i className="far fa-clock me-2" />
                Horários
              </NavLink>
              <NavLink className="nav-link" to={`${url}/schedule-att`}>
                <i className="far fa-clipboard me-2" />
                Atendimentos
              </NavLink>
            </Nav>
          </Accordion>
        </Col>
        <Col md="9">
          <Card>
            <Card.Body>
              <Switch>
                <AdminRoute exact path={path} component={Dashboard} />
                <AdminRoute path={`${path}/schedule`} component={Schedule} />
                <AdminRoute
                  path={`${path}/schedule-hour`}
                  component={ScheduleHour}
                />
                <AdminRoute path={`${path}/users`} component={Users} />
                <AdminRoute
                  path={`${path}/schedule-att`}
                  component={ScheduleAtt}
                />
              </Switch>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
