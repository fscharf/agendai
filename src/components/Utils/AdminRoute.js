import React from "react";
import { Redirect, Route } from "react-router";
import { getToken, getUser } from "./Common";

const AdminRoute = ({ component: Component, ...rest }) => {
  const user = getUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        return getToken() && user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default AdminRoute;
