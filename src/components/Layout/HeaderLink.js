import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function HeaderLink({ children, tooltipText, path, ...rest }) {
  const tooltip = <Tooltip>{tooltipText}</Tooltip>;

  return (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <NavLink activeClassName="active" to={path} className="nav-link" {...rest}>
        {children}
      </NavLink>
    </OverlayTrigger>
  );
}
