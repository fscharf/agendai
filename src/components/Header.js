import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { handleSignOut } from "./Utils/Common";

export default function Header() {
  return (
    <Navbar variant="light" bg="white" className="border-bottom mb-3">
      <Container>
        <NavLink to="/dashboard" className="navbar-brand">
          <strong className="brand-title">Barber Shop.</strong>
        </NavLink>
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
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Conta</Tooltip>}>
            <NavLink to="//" className="nav-link" data-bs-toggle="dropdown">
              <i className="far fa-user-circle fa-lg" />
            </NavLink>
          </OverlayTrigger>
            <ul className="dropdown-menu dropdown-menu-end">
              <NavLink
                to="/account"
                activeClassName="active"
                className="dropdown-item"
              >
                <i className="far fa-user-circle me-2" />
                Conta
              </NavLink>
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
      </Container>
    </Navbar>
  );
}
