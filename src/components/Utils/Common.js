import { immediateToast } from "izitoast-react";
import api from "../../services/api";
import history from "../../services/history";

export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

export const token = getToken();
export const userSession = getUser();

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

export const verifyUser = async (code) => {
  await api
    .get(`/confirm/${code}`)
    .then(() => {
      return;
    })
    .catch(() => {
      immediateToast("info", {
        title: "Oops, parece que o código expirou.",
        timeout: 10000,
      });
      history.push("/signin");
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

export const checkHour = (hour) => {
  let currentHour;
  let newDate = new Date();

  if (hour) {
    newDate = new Date(hour);
    return (currentHour = newDate.getHours());
  }

  currentHour = newDate.getHours();
  return currentHour;
};

