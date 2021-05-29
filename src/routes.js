import React, { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";

import Welcome from "./pages/Welcome";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule/ScheduleForm";
import ScheduleList from "./pages/Schedule/ScheduleList";
import Account from "./pages/Account/Account";
import ChangePassword from "./pages/Account/ChangePassword";
import { Toaster } from "react-hot-toast";

import history from "./services/history";
import PublicRoute from "./components/Utils/PublicRoute";
import PrivateRoute from "./components/Utils/PrivateRoute";
import {
  getToken,
  getUser,
  removeUserSession,
  setUserSession,
} from "./components/Utils/Common";
import Loading from "./components/Loading";
import api from "./services/api";
import Confirmation from "./pages/Account/Confirmation";
import ChangeEmail from "./pages/Account/ChangeEmail";

export default function Routes() {
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
    <Router history={history}>
      <Switch>
        <PublicRoute component={Welcome} path="/" exact />
        <PublicRoute component={SignIn} path="/signin" />
        <PublicRoute component={SignUp} path="/signup" />
        <PublicRoute
          component={Confirmation}
          path="/confirm/:confirmationCode"
        />
        <PrivateRoute component={Dashboard} path="/dashboard" />
        <PrivateRoute component={Schedule} path="/schedule" />
        <PrivateRoute component={ScheduleList} path="/schedule-list" />
        <PrivateRoute component={Account} path="/account" />
        <PrivateRoute component={ChangePassword} path="/change-password" />
        <PrivateRoute component={ChangeEmail} path="/change-email" />
        <Route component={NotFound} path="*" />
      </Switch>
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
      />
    </Router>
  );
}
