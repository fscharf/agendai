import React from "react";
import { Button } from "react-bootstrap";

const NightMode = () => {
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = () => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      localStorage.setItem("theme", "light");
      return (theme = lightTheme);
    } else {
      body.classList.replace(lightTheme, darkTheme);
      localStorage.setItem("theme", "dark");
      return (theme = darkTheme);
    }
  };

  return (
    <Button onClick={switchTheme} variant="light" size="sm" className="rounded-pill">
      <i className="far fa-moon me-2" />Modo Escuro
    </Button>
  );
};

export default NightMode;
