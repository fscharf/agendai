import { immediateToast } from "izitoast-react";
import toast from "react-hot-toast";
import List from "../../pages/Schedule/List";
import NewSchedule from "../../pages/Schedule/NewSchedule";
import api from "../../services/api";
import history from "../../services/history";
import { checkDate, checkHour } from "../Utils/Common";

export class Schedule {
  async get(props) {
    var query;
    if (props) {
      query = {
        params: {
          date: props.date,
          hour: props.hour,
          status: props.status,
          user_id: props.userKey,
        },
      };
    }
    return await api.get("/schedule", query);
  }

  async create(props) {
    if (!props.date || !props.hour || !props.userKey || !props.description) {
      console.log(props)
      return immediateToast("error", {
        title: "Por favor, preencha todos campos.",
      });
    }

    if (checkDate(props.date) < checkDate()) {
      return immediateToast("error", {
        title: "Selecione uma data válida.",
      });
    }

    if (
      checkDate(props.date) === checkDate() &&
      checkHour(props.date + " " + props.hour) < checkHour()
    ) {
      return immediateToast("error", {
        title: "Selecione um horário válido.",
      });
    }

    return await api
      .post("/schedule", {
        hour: props.hour,
        date: props.date,
        description: props.description,
        user_id: props.userKey,
        schedule_hour_id: props.scheduleHourKey,
      })
      .then((res) => {
        immediateToast("success", { title: res.data.message });
        history.push("/schedule-list");
      })
      .catch((err) => {
        immediateToast("error", { title: err.response.data.message });
      });
  }

  async update(props) {
    return await api
      .put(`/schedule/${props.key}`, {
        status: props.status,
        date: props.date,
        hour: props.hour,
      })
      .then((res) => {
        toast.success(res.data.message);
        return setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        return toast.error(err.response.data.message);
      });
  }

  async delete(props) {
    return await api
      .delete(`/schedule/${props.key}`)
      .then((res) => {
        return toast.success(res.data.message);
      })
      .catch((err) => {
        return toast.error(err.response.data.message);
      });
  }

  list() {
    return List;
  }

  newSchedule() {
    return NewSchedule;
  }
}
