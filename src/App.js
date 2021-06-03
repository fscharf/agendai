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
import toast, { ToastBar, Toaster } from "react-hot-toast";

export default function App() {
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const user = getUser();
    const token = getToken();

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

  return (
    <>
      <Routes />

      <Toaster
        toastOptions={{
          duration: 100000,
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
        }}
      >
        {(t) => (
          <ToastBar>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  );
}
