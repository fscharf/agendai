import React from "react";
import { InputGroup } from "react-bootstrap";

export default function ScheduleDesc({ ...rest }) {
  return (
    <InputGroup>
      <label className="input-group-text">
        <i className="far fa-clipboard-list" />
      </label>
      <select className="form-select" {...rest}>
        <option value="">Selecione...</option>
        <option value="R$ 20,00 - Corte">R$ 20,00 - Corte</option>
        <option value="R$ 30,00 - Relaxamento">R$ 30,00 - Relaxamento</option>
        <option value="R$ 30,00 - Corte + Barba">
          R$ 30,00 - Corte + Barba
        </option>
      </select>
    </InputGroup>
  );
}
