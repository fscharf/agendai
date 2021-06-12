import React from "react";
import { Helmet } from "react-helmet";

export default function HelmetTitle(props) {
  return (
    <Helmet>
      <title>{props.title ? props.title : "agendaí"}</title>
    </Helmet>
  );
}
