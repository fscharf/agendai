import toast from "react-hot-toast";
import api from "../../services/api";
import history from "../../services/history";
import { getUser } from "../Utils/Common";

export const user = getUser();

export class User {
  async createUser(props) {
    if (
      !props.email ||
      !props.password ||
      !props.confirmPassword ||
      !props.name
    ) {
      return toast.error("Por favor, preencha todos os campos.");
    }
    if (props.password !== props.confirmPassword) {
      return toast.error("Senhas não conferem.");
    }
    if (props.password.length < 6) {
      return toast.error("Sua senha deve conter pelo menos 6 caracteres.");
    }

    return await api
      .post("/users", {
        username: props.name,
        email: props.email,
        password: props.password,
      })
      .then((res) => {
        toast.success(res.data.message);
        return history.push("/signin");
      })
      .catch((err) => {
        if (err) {
          return toast.error(err.response.data.message);
        } else {
          return toast.error(
            "Oops! Alguma coisa deu errado. Entre em contato com o Administrador."
          );
        }
      });
  }

  async getUserById(props) {
    return await api.get(`/users/${props.userKey}`);
  }

  async updateUser(props) {
    return await api.put(`/users/${props.userKey}`, {
      username: props.name,
      email: props.email,
    });
  }
}
