import React, { createContext } from "react";
import useAuth from "./hooks/useAuth";
import useSchedule from "./hooks/useSchedule";
import useUsers from "./hooks/useUsers";
const Context = createContext();

function AppProvider({ children }) {
  const { handleSignIn, authLoading, handleSignOut } = useAuth();
  const { loading, user, userClass } = useUsers();
  const { scheduleClass, scheduleHour } = useSchedule();

  return (
    <Context.Provider
      value={{
        user,
        handleSignIn,
        handleSignOut,
        userClass,
        scheduleClass,
        scheduleHour,
        authLoading,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AppProvider };
