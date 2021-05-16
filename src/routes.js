import React, { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";

import App from "./pages/App";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule/Schedule";
import ScheduleList from "./pages/Schedule/ScheduleList";
import Account from "./pages/User/Account";

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
import { user } from "./components/Header";

export default function Routes() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    api
      .get(`/verifyToken?token=${token}&email=${user.email}`)
      .then((res) => {
        setUserSession(res.data.token, res.data.user);
        setAuthLoading(false);
      })
      .catch((err) => {
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
        <PublicRoute component={App} path="/" exact />
        <PublicRoute component={SignIn} path="/signin" />
        <PublicRoute component={SignUp} path="/signup" />
        <PrivateRoute component={Dashboard} path="/dashboard" />
        <PrivateRoute component={Schedule} path="/schedule" />
        <PrivateRoute component={ScheduleList} path="/schedule-list" />
        <PrivateRoute component={Account} path="/account" />
        <Route component={NotFound} path="*" />
      </Switch>
    </Router>
  );
}
