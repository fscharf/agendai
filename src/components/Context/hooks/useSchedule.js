import React from "react";
import api from "../../../services/api";
import { Schedule } from "../../Controllers/ScheduleController";

export default function useSchedule() {
  const [scheduleHour, setScheduleHour] = React.useState([]);
  const scheduleClass = new Schedule();

  React.useEffect(() => {
    let isMounted = false;
    (async () => {
      await api.get("/scheduleHour").then((res) => {
        if (!isMounted) {
          setScheduleHour(res.data);
        }
      });
    })();

    return () => {
      isMounted = true;
    };
  }, []);

  return { scheduleClass, scheduleHour };
}
