import React from "react";
import icon from "../../assets/img/icon.svg";

const Icon = ({component: Component, ...rest}) => {
  return <img src={icon} alt="Ícone" {...rest} />;
}

export default Icon;
