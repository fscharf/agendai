import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { getUser, handleSignOut } from "../Utils/Common";
import Brand from "./Brand";
import Icon from "./Icon";
import NightMode from "./NightMode";

export default function Header() {
  const user = getUser();
  return (
    <Navbar variant="light" bg="white" className="py-3 mb-3">
      <Container>
        <Nav>
          <NavLink to="/dashboard" className="navbar-brand text-primary">
            <Icon width="30" className="me-2" />
            <Brand />
          </NavLink>
        </Nav>
        {user ? (
          <Nav>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Início</Tooltip>}
            >
              <NavLink
                activeClassName="active"
                to="/dashboard"
                className="nav-link"
              >
                <i className="far fa-home-alt fa-lg" />
              </NavLink>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Agendar</Tooltip>}
            >
              <NavLink
                activeClassName="active"
                to="/schedule"
                className="nav-link"
              >
                <i className="far fa-calendar-plus fa-lg" />
              </NavLink>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Agendamentos</Tooltip>}
            >
              <NavLink
                activeClassName="active"
                to="/schedule-list"
                className="nav-link"
              >
                <i className="far fa-calendar-check fa-lg" />
              </NavLink>
            </OverlayTrigger>

            <div className="dropdown">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Conta</Tooltip>}
              >
                <NavLink to="//" className="nav-link" data-bs-toggle="dropdown">
                  <i className="far fa-user-circle fa-lg" />
                </NavLink>
              </OverlayTrigger>
              <ul
                className="dropdown-menu dropdown-menu-end"
                style={{ width: "200px" }}
              >
                <NavLink
                  to="/account"
                  activeClassName="active"
                  className="dropdown-item"
                >
                  <i className="far fa-user-circle me-2" />
                  Conta
                </NavLink>
                <div className="dropdown-item-text">
                  <NightMode />
                </div>
                <div className="dropdown-divider"></div>

                <NavLink
                  to="//"
                  onClick={handleSignOut}
                  activeClassName="active"
                  className="dropdown-item"
                >
                  <i className="far fa-sign-out-alt me-2" />
                  Encerrar sessão
                </NavLink>
              </ul>
            </div>
          </Nav>
        ) : (
          <Nav>
            <NavLink className="nav-link me-2" to="/signin">
              Entrar
            </NavLink>
            <NavLink className="btn btn-primary" to="/signup">
              <span className="d-md-none d-block">
                <i className="far fa-user-plus" />
              </span>
              <span className="d-md-block d-none">Cadastre-se grátis</span>
            </NavLink>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
