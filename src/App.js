import React, { useEffect, useState } from "react";
import Routes from "./routes";
import {
  getToken,
  getUser,
  removeUserSession,
  setUserSession,
} from "./components/Utils/Common";
import Loading from "./components/Loading";
import api from "./services/api";
import { immediateToast } from "izitoast-react";

export default function App() {
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const user = getUser();
    const token = getToken();

    immediateToast("settings", {
      position: "bottomCenter",
      closeOnClick: true,
      displayMode: 1,
    });

    if (!token || !user) {
      return;
    }

    const verifyToken = () =>
      api
        .get(`/verifyToken?token=${token}&email=${user.email}`)
        .then((res) => {
          setUserSession(res.data.token, res.data.user);
          setAuthLoading(false);
        })
        .catch(() => {
          removeUserSession();
          setAuthLoading(false);
        });

    verifyToken();
    getUser();
  }, []);

  if (authLoading && getToken()) {
    return <Loading />;
  }

  return <Routes />;
}
