import React from "react";
import Reminders from "../components/Reminders";
import { getUser } from "../components/Utils/Common";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = getUser();

  return (
    <Layout>
      <h4>
        Bem-vindo, <strong>{user.username}</strong>
      </h4>
      <p className="text-muted">Que tal olhar os lembretes?</p>
      <Reminders />
      <p>Atalhos</p>
      <Link to="/schedule" className="btn btn-dark">Agendar</Link>
    </Layout>
  );
}
