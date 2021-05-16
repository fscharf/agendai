import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, NavDropdown } from "react-bootstrap";
import lightIcon from "../assets/img/icon.svg";
import { getUser, removeUserSession } from "./Utils/Common";
import history from "../services/history";

export const user = getUser();

export default function Header(props) {
  const handleSignOut = () => {
    removeUserSession();
    history.push("/signin");
  };

  return (
    <Navbar expand="lg" variant="dark" className="py-3">
      <Container>
        <Navbar.Brand>
          <NavLink to="/dashboard">
            <img src={lightIcon} alt="icon" width="50" className="img-fluid" />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="mainHeader" />
        <Navbar.Collapse id="mainHeader">
          <Nav className="me-auto small">
            <Nav.Item>
              <NavLink
                activeClassName="active"
                to="/dashboard"
                className="nav-link"
              >
                <i className="far fa-home-alt me-2"></i>INÍCIO
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                activeClassName="active"
                to="/schedule"
                className="nav-link"
              >
                <i className="far fa-calendar-plus me-2"></i>AGENDAR CORTE
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                activeClassName="active"
                to="/schedule-list"
                className="nav-link"
              >
                <i className="far fa-calendar-check me-2"></i>MEUS AGENDAMENTOS
              </NavLink>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto small">
            <NavDropdown
              as={Dropdown}
              title={user.name}
              className="text-muted"
              id="basic-nav-dropdown"
            >
              <Dropdown.Header>Mais opções</Dropdown.Header>

              <Link
                activeClassName="dropdown-item active"
                className="dropdown-item"
                to="/account"
                exact
              >
                <i className="far fa-user-circle me-2"></i>Conta
              </Link>
              <Link
                activeClassName="dropdown-item"
                className="dropdown-item"
                to="/"
                exact
              >
                <i className="far fa-cog me-2"></i>Configurações
              </Link>
              <NavDropdown.Divider />
              <Dropdown.Item activeClassName="active" onClick={handleSignOut}>
                <i className="far fa-sign-out-alt me-2"></i>Sair da Conta
              </Dropdown.Item>
            </NavDropdown>
            <Nav.Item></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
