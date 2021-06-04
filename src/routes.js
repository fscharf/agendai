import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import Welcome from "./pages/Welcome";
import SignIn from "./components/Auth/SignIn";
import NotFound from "./components/NotFound";
import SignUp from "./components/Auth/SignUp";
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
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import AdminRoute from "./components/Utils/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute component={Welcome} path="/" exact />
        <PublicRoute component={SignIn} path="/signin" />
        <PublicRoute component={SignUp} path="/signup" />
        <PublicRoute component={ForgotPassword} path="/forgot-password" />
        <PublicRoute
          component={ResetPassword}
          path="/reset-password/:confirmationCode"
        />
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
        <AdminRoute component={AdminDashboard} path="/admin" />
        <Route component={NotFound} path="*" />
      </Switch>
    </Router>
  );
}
