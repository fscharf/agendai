import { immediateToast } from "izitoast-react";
import React from "react";
import api from "../../../services/api";
import {
  removeUserSession,
  setUserSession,
  token,
  userSession,
} from "../../Utils/Common";

export default function useAuth() {
  const [authLoading, setAuthLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = false;

    (async () => {
      if (!token || !userSession) {
        return null;
      }
      await api
        .get(`/verifyToken?token=${token}&email=${userSession.email}`)
        .then((res) => {
          if (!isMounted) {
            setUserSession(res.data.token, res.data.user);
          }
        })
        .catch(() => {
          removeUserSession();
        });
      return () => {
        isMounted = true;
      };
    })();
  }, []);

  async function handleSignIn(email, password) {
    setAuthLoading(true);
    await api
      .post("/users/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        immediateToast("success", { title: res.data.message });
        setAuthLoading(false);
        setUserSession(res.data.token, res.data.user);
        setTimeout(() => (window.location.href = "/dashboard"), 3000);
      })
      .catch((err) => {
        setAuthLoading(false);
        immediateToast("error", { title: err.response.data.message });
      });
  }

  function handleSignOut() {
    removeUserSession();
    window.location.href = "/signin";
  }

  return { handleSignIn, authLoading, handleSignOut };
}
