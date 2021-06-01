import React from "react";
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

import history from "./services/history";
import PublicRoute from "./components/Utils/PublicRoute";
import PrivateRoute from "./components/Utils/PrivateRoute";
import Confirmation from "./pages/Account/Confirmation";
import ChangeEmail from "./pages/Account/ChangeEmail";

export default function Routes() {
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
    </Router>
  );
}
