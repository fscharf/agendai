import React from "react";
import Routes from "./routes";
import { immediateToast } from "izitoast-react";
import { AppProvider } from "./components/Context/AppContext";
import history from "./services/history";
import { Router } from "react-router";

export default function App() {
  React.useEffect(() => {
    immediateToast("settings", {
      position: "bottomCenter",
      closeOnClick: true,
      displayMode: 2,
      class: "rounded",
      progressBar: false,
      layout: 2,
    });
  }, []);

  return (
    <AppProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AppProvider>
  );
}
