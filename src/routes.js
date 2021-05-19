import React, { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";

import Welcome from "./pages/Welcome";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule/Schedule";
import ScheduleList from "./pages/Schedule/ScheduleList";
import Account from "./pages/Account/Account";
import ChangePassword from "./pages/Account/ChangePassword";
import { Toaster } from "react-hot-toast";

import history from "./services/history";
import PublicRoute from "./components/Utils/PublicRoute";
import PrivateRoute from "./components/Utils/PrivateRoute";
import {
  getToken,
  removeUserSession,
  setUserSession,
} from "./components/Utils/Common";
import Loading from "./components/Loading";
import api from "./services/api";
import { user } from "./components/Controllers/UserController";
import ConfirmAccount from "./pages/Account/ConfirmAccount";

export default function Routes() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    if (!user.account_verified) {
      setAuthLoading(false);
      history.push("/confirm-account");
    }

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
        <PrivateRoute component={Dashboard} path="/dashboard" />
        <PrivateRoute component={Schedule} path="/schedule" />
        <PrivateRoute component={ScheduleList} path="/schedule-list" />
        <PrivateRoute component={Account} path="/account" />
        <PrivateRoute component={ConfirmAccount} path="/confirm-account" />
        <PrivateRoute component={ChangePassword} path="/change-password" />
        <Route component={NotFound} path="*" />
      </Switch>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    </Router>
  );
}
