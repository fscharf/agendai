import history from "../../services/history";
import api from "../../services/api";

export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

export const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const removeUserSession = () => {
  sessionStorage.clear("user");
  sessionStorage.clear("token");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

export const handleSignOut = () => {
  removeUserSession();
  history.push("/signin");
};

export const verifyUser = (code) => {
  return api.get("confirm/" + code).then((response) => {
    return response.data;
  });
};
