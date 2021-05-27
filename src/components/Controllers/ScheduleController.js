import toast from "react-hot-toast";
import api from "../../services/api";
import history from "../../services/history";

export class Schedule {
  async createSchedule(props) {
    const startDate = new Date();

    if (!props.date || !props.hour || !props.userKey) {
      return toast.error("Por favor, preencha todos campos.");
    }

    if (new Date(props.date).getUTCDate() < startDate.getUTCDate()) {
      return toast.error("Por favor, selecione uma data válida.");
    }

    return await api
      .post("/schedule", {
        hour: props.hour,
        date: props.date,
        user_id: props.userKey,
      })
      .then((res) => {
        toast.success(res.data.message);
        return history.push("/schedule-list");
      })
      .catch((err) => {
        return toast.error(err.response.data.message);
      });
  }

  async getSchedule(props) {
    return await api.get("/schedule", {
      params: {
        date: props.date,
        hour: props.hour,
        status: props.status,
        user_id: props.userKey,
      },
    });
  }

  async updateSchedule(props) {
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

  async deleteSchedule(props) {
    return await api
      .delete(`/schedule/${props.key}`)
      .then((res) => {
        return toast.success(res.data.message);
      })
      .catch((err) => {
        return toast.error(err.response.data.message);
      });
  }
}
