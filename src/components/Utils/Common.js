import history from "../../services/history";

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
  return history.push("/signin");
};

export const user = getUser();