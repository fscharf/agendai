import React from "react";
import { InputGroup } from "react-bootstrap";

export default function ScheduleHour(props) {
  return (
    <InputGroup>
      <label className="input-group-text">
        <i className="far fa-clock" />
      </label>
      <select
        className="form-select"
        onChange={props.onChange}
        value={props.value}
      >
        <option value="">Selecione...</option>
        <option>09:00</option>
        <option>10:00</option>
        <option>11:00</option>
        <option>12:00</option>
        <option>14:00</option>
        <option>15:00</option>
        <option>16:00</option>
        <option>17:00</option>
        <option>18:00</option>
      </select>
    </InputGroup>
  );
}
