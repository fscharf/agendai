import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Container, Col, Row, Navbar, Nav } from "react-bootstrap";
import Brand from "./Brand";
import Icon from "./Icon";
import { Context } from "../Context/AppContext";
import NightMode from "./NightMode";
import { userSession } from "../Utils/Common";
import HeaderLink from "./HeaderLink";

export default function Header() {
  const { user, handleSignOut } = useContext(Context);

  return (
    <Navbar variant="light" bg="white" className="py-3 mb-3">
      <Container>
        <Nav>
          <NavLink to="/dashboard" className="navbar-brand text-primary">
            <Icon width="30" className="me-2" />
            <Brand />
          </NavLink>
        </Nav>
        {userSession ? (
          <Nav className="user-nav">
            <HeaderLink path="/" tooltipText="Início">
              <i className="far fa-home-alt fa-lg" />
            </HeaderLink>
            <HeaderLink path="/schedule-list" tooltipText="Agendamentos">
              <i className="far fa-calendar-check fa-lg" />
            </HeaderLink>

            {user.isAdmin && (
              <HeaderLink path="/admin" tooltipText="Painel Administrativo">
                <i className="far fa-sliders-h" />
              </HeaderLink>
            )}

            <div className="dropdown">
              <HeaderLink
                path="//"
                tooltipText="Conta"
                data-bs-toggle="dropdown"
              >
                <i className="far fa-user-circle fa-lg" />
              </HeaderLink>
              <ul
                className="dropdown-menu dropdown-menu-end"
                style={{ width: "220px" }}
              >
                <NavLink
                  to="/account"
                  activeClassName="active"
                  className="dropdown-item"
                >
                  <i className="far fa-user-circle me-2" />
                  Conta
                </NavLink>

                <div className="dropdown-divider" />

                <div className="dropdown-item-text">
                  <Row className="align-items-center">
                    <Col md="4">Tema</Col>
                    <Col md>
                      <NightMode size="sm" className="w-100" />
                    </Col>
                  </Row>
                </div>
                <div className="dropdown-divider" />

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
