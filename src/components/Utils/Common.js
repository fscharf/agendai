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
  window.location.href = "/signin";
};

export const verifyUser = (code) => {
  return api.get("confirm/" + code).then((response) => {
    return response.data;
  });
};

export const formatDate = (date) => {
  var split = date.split("-");
  var formatedDate = split[2] + "/" + split[1] + "/" + split[0];
  return formatedDate;
};

export const checkDate = (props) => {
  let currentDate;
  let newDate = new Date();

  if (props) {
    newDate = new Date(props);
    return (currentDate = newDate.getUTCDate());
  }

  currentDate = newDate.getUTCDate();
  return currentDate;
};
