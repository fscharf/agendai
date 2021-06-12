import React from "react";
import { Route, Switch } from "react-router-dom";

import Welcome from "./pages/Welcome";
import SignIn from "./components/Auth/SignIn";
import NotFound from "./components/NotFound";
import SignUp from "./components/Auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account/Account";

import PublicRoute from "./components/Utils/PublicRoute";
import PrivateRoute from "./components/Utils/PrivateRoute";
import Confirmation from "./pages/Account/Confirmation";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import AdminRoute from "./components/Utils/AdminRoute";
import AdminIndex from "./pages/Admin/Index";
import { Context } from "./components/Context/AppContext";

export default function Routes() {
  const { scheduleClass } = React.useContext(Context);

  return (
    <Switch>
      <PublicRoute component={Welcome} path="/" exact />
      <PublicRoute component={SignIn} path="/signin" />
      <PublicRoute component={SignUp} path="/signup" />
      <PublicRoute component={ForgotPassword} path="/forgot-password" />
      <PublicRoute
        component={ResetPassword}
        path="/reset-password/:confirmationCode"
      />
      <PublicRoute component={Confirmation} path="/confirm/:confirmationCode" />
      <PrivateRoute component={Dashboard} path="/dashboard" />
      <PrivateRoute component={scheduleClass.newSchedule()} path="/schedule" />
      <PrivateRoute component={scheduleClass.list()} path="/schedule-list" />
      <PrivateRoute component={Account} path="/account" />
      <AdminRoute component={AdminIndex} path="/admin" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
}
