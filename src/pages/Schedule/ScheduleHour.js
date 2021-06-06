import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import api from "../../services/api";

export default function ScheduleHour(props) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    api.get("/scheduleHour", {}).then((res) => setValues(res.data));
  }, []);

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
        {values.map((data) => {
          return <option key={data._id}>{data.hour}</option>;
        })}
      </select>
    </InputGroup>
  );
}
