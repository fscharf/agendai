import React from "react";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import AdminRoute from "../../components/Utils/AdminRoute";
import { Button, Col, Nav, Row } from "react-bootstrap";
import Dashboard from "./Dashboard";
import ScheduleHour from "./Schedule/ScheduleHour";

export default function Index() {
  const title = "Painel Administrativo";
  let { path, url } = useRouteMatch();

  //adicionar id da tabela schedule_hour para a tabela schedule
  //ajustar todos toasters
  //usar useRouteMatch() no header

  return (
    <Layout>
      <HelmetTitle title={title} />
      <p>
        <i className="far fa-cog me-2" />
        {title}
      </p>
      <Button
        data-bs-target="#rowCollapse"
        data-bs-toggle="collapse"
        className="d-block d-sm-none"
      >
        <i className="far fa-stream me-2" />
        Menu
      </Button>
      <Row className="mb-5 navbar-collapse" id="rowCollapse">
        <Col md>
          <Nav variant="tabs" fill defaultActiveKey={url}>
            <NavLink className="nav-link" exact to={url}>
              <i className="far fa-cog me-2" />
              Meu painel
            </NavLink>
            <NavLink className="nav-link" to={`${url}/schedule-hour`}>
              <i className="far fa-clock me-2" />
              Horários
            </NavLink>
            <NavLink className="nav-link disabled" to={`${url}/users`}>
              <i className="far fa-users me-2" />
              Usuários
            </NavLink>
            <NavLink className="nav-link disabled" to={`${url}/schedule`}>
              <i className="far fa-calendar-alt me-2" />
              Atendimentos
            </NavLink>
          </Nav>
        </Col>
      </Row>
      <Switch>
        <AdminRoute exact path={path}>
          <Dashboard />
        </AdminRoute>
        <AdminRoute path={`${path}/:scheduleId`}>
          <ScheduleHour />
        </AdminRoute>
      </Switch>
    </Layout>
  );
}
