import React from "react";
import { Jumbotron } from "react-bootstrap";
import Header from "../Header";

export default function Layout({ children }) {
  return (
    <Jumbotron fluid className="vh-100 bg-light">
      <Header />
      {children}
    </Jumbotron>
  );
}
