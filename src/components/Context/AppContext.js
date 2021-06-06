import React, { createContext } from "react";
import useAuth from "./hooks/useAuth";
import useUsers from "./hooks/useUsers";
const Context = createContext();

function AppProvider({ children }) {
  const { handleSignIn, authLoading, handleSignOut } = useAuth();
  const { loading, user } = useUsers();

  return (
    <Context.Provider
      value={{ handleSignIn, handleSignOut, authLoading, loading, user }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AppProvider };
