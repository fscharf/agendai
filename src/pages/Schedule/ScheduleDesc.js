import React from "react";
import { InputGroup } from "react-bootstrap";

export default function ScheduleDesc(props) {
  return (
    <InputGroup>
      <label className="input-group-text">
        <i className="far fa-clipboard-list" />
      </label>
      <select
        className="form-select"
        onChange={props.onChange}
        value={props.value}
      >
        <option value="">Selecione...</option>
        <option>R$ 20,00 - Corte</option>
        <option>R$ 30,00 - Relaxamento</option>
        <option>R$ 30,00 - Corte + Barba</option>
      </select>
    </InputGroup>
  );
}
