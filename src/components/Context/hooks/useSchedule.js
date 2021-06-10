import React from "react";
import api from "../../../services/api";
import { Schedule } from "../../Controllers/ScheduleController";
import { userSession } from "../../Utils/Common";

export default function useSchedule() {
  const [scheduleHour, setScheduleHour] = React.useState([]);
  const [schedule, setSchedule] = React.useState([]);
  const scheduleClass = new Schedule();
  const queryParams = (userKey) => {
    return { user_id: userKey };
  };

  React.useEffect(() => {
    let isMounted = false;
    if (userSession) {
      (async () => {
        if (userSession) {
          await api.get("/scheduleHour").then((res) => {
            if (!isMounted) {
              setScheduleHour(res.data);
            }
          });
        }
      })();
      (async () => {
        api.get("/schedule", { params: queryParams() }).then((res) => {
          if (!isMounted) {
            setSchedule(res.data);
          }
        });
      })();
    }

    return () => {
      isMounted = true;
    };
  }, []);

  return { scheduleClass, scheduleHour, schedule, queryParams };
}
