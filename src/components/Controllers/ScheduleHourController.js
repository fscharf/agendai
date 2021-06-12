import api from "../../services/api";

export class ScheduleHour {
  async get(hour) {
    var query;
    if (hour) {
      query = {
        params: {
          hour: hour,
        },
      };
    }
    return await api.get("/scheduleHour", query);
  }
}