import React from "react";

export default function Brand(props) {
  return <span className="brand-title">{props.title ? props.title : 'agendaí'}</span>;
}
