import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function ScheduleHour({ children, ...rest }) {
  const [state, setState] = useState({
    scheduleHour: [],
  });

  useEffect(() => {
    (async () => {
      await api
        .get("/scheduleHour")
        .then((res) => setState({ scheduleHour: res.data }));
    })();
  }, []);

  return (
    <select className="form-select" {...rest}>
      <option value="">Selecione...</option>
      {state.scheduleHour &&
        state.scheduleHour.map((data) => {
          return (
            <option
              key={data._id}
              value={data.hour}
              disabled={() =>
                state.schedule &&
                state.schedule.length > 0 &&
                state.schedule.hour === data.hour
                  ? true
                  : false
              }
            >
              {String(data.hour).replace(":00", "")}
            </option>
          );
        })}
    </select>
  );
}
