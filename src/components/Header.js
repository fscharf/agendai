import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, NavDropdown } from "react-bootstrap";
import { handleSignOut } from "./Utils/Common";

export default function Header() {
  return (
    <Navbar variant="light" bg="white" className="border-bottom mb-3">
      <Container>
        <NavLink to="/dashboard" className="navbar-brand">
          <strong className="brand-title">Barber Shop.</strong>
        </NavLink>
        <Nav>
          <Nav.Item>
            <NavLink
              activeClassName="active"
              to="/dashboard"
              className="nav-link"
            >
              <i className="far fa-home-alt fa-lg" />
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              activeClassName="active"
              to="/schedule"
              className="nav-link"
            >
              <i className="far fa-calendar-plus fa-lg" />
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              activeClassName="active"
              to="/schedule-list"
              className="nav-link"
            >
              <i className="far fa-calendar-check fa-lg" />
            </NavLink>
          </Nav.Item>
          <NavDropdown
            title={<i className="far fa-user fa-lg" />}
            className="text-muted"
            id="basic-nav-dropdown"
          >
            <Dropdown.Header>Mais opções</Dropdown.Header>

            <Link
              activeClassName="dropdown-item active"
              className="dropdown-item"
              to="/account"
            >
              <i className="far fa-user-circle me-2" />
              Conta
            </Link>
            <Link
              activeClassName="dropdown-item"
              className="dropdown-item"
              to="/"
            >
              <i className="far fa-cog me-2" />
              Configurações
            </Link>
            <NavDropdown.Divider />
            <Dropdown.Item activeClassName="active" onClick={handleSignOut}>
              <i className="far fa-sign-out-alt me-2" />
              Sair da Conta
            </Dropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
