import React from "react";
import { InputGroup } from "react-bootstrap";

export default function ScheduleHour({ children, ...rest }) {
  return (
    <InputGroup>
      <label className="input-group-text">
        <i className="far fa-clock" />
      </label>
      <select className="form-select" {...rest}>
        <option value="">Selecione...</option>
        {children}
      </select>
    </InputGroup>
  );
}
