import React from "react";
import Layout from "../../components/Layout/Layout";
import HelmetTitle from "../../components/Layout/HelmetTitle";
import { Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import AdminScheduleHour from "./Schedule/AdminScheduleHour";
import AdminRoute from "../../components/Utils/AdminRoute";
import { Col, Nav, Row } from "react-bootstrap";

export default function AdminDashboard() {
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
      <Row className="mb-3">
        <Col md="6">
          <Nav fill>
            <Link className="nav-link" to={`${url}/schedule-hour`}>
              <i className="far fa-clock me-2" />
              Gerenciar horários
            </Link>
            <Link className="nav-link" to={`${url}/users`}>
              <i className="far fa-users me-2" />
              Gerenciar usuários
            </Link>
            <Link className="nav-link" to={`${url}/schedule`}>
              <i className="far fa-clipboard me-2" />
              Gerenciar atendimentos
            </Link>
          </Nav>
        </Col>
      </Row>

      <Switch>
        <AdminRoute path={`${path}/:scheduleId`}>
          <AdminScheduleHour />
        </AdminRoute>
      </Switch>
    </Layout>
  );
}
