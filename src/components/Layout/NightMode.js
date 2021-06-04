import React from "react";

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
    <span onClick={switchTheme}>
      <i className="far fa-moon me-2" />Modo Escuro
    </span>
  );
};

export default NightMode;
