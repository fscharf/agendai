import { immediateToast } from "izitoast-react";
import api from "../../services/api";
import history from "../../services/history";

export class User {
  getUsers = async (props) => {
    if (props) {
      return await api.get("/users", {
        params: {
          user_id: props.key,
          email: props.email,
          username: props.name,
        },
      });
    }
    return await api.get("/users");
  };

  getUserById = async (key) => {
    return await api.get(`/users/${key}`)
  };

  createUser = async (props) => {
    if (
      !props.email ||
      !props.password ||
      !props.name ||
      !props.confirmPassword
    ) {
      return immediateToast("error", {
        title: "Por favor, preencha todos os campos.",
      });
    }
    if (props.password !== props.confirmPassword) {
      return immediateToast("error", { title: "Senhas não conferem." });
    }
    if (props.password.length < 6) {
      return immediateToast("error", {
        title: "Sua senha deve conter pelo menos 6 caracteres.",
      });
    }

    await api
      .post("/users", {
        username: props.name,
        email: props.email,
        password: props.password,
      })
      .then((res) => {
        immediateToast("success", { title: res.data.message, timeout: 0 });
        history.push("/signin");
      })
      .catch((err) => {
        immediateToast("error", { title: err.response.data.message });
      });
  };

  handleUpdate = async (props) => {
    await api
      .put(`/users/${props.key}`, {
        username: props.username,
        email: props.email,
        isActive: props.isActive,
        isAdmin: props.isAdmin,
      })
      .then((res) => {
        immediateToast("success", { title: res.data.message });
      })
      .catch((err) => {
        immediateToast("error", { title: err.response.data.message });
      });
  };
}
