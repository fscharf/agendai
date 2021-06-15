import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Description({ ...rest }) {
  const [state, setState] = useState({
    scheduleAtt: [],
  });

  useEffect(() => {
    (async () => {
      await api
        .get("/schedule-att")
        .then((res) => setState({ scheduleAtt: res.data }));
    })();
  }, []);

  return (
    <select className="form-select" {...rest}>
      <option value="">Selecione...</option>
      {state.scheduleAtt &&
        state.scheduleAtt.map((data) => {
          return (
            <option key={data._id} value={data.description}>
              {data.description}
            </option>
          );
        })}
    </select>
  );
}
