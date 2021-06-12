import React, { useContext } from "react";
import Reminders from "../components/Reminders";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import HelmetTitle from "../components/Layout/HelmetTitle";
import { Context } from "../components/Context/AppContext";
import Loading from "../components/Loading";

export default function Dashboard() {
  const { loading, user } = useContext(Context);

  return (
    <Layout>
      <HelmetTitle title="Início" />
      <h4>
        Bem-vindo, <strong>{loading ? <Loading /> : user.username}</strong>
      </h4>
      <p className="text-muted">Que tal olhar os lembretes?</p>
      <Reminders />
      <Link to="/schedule" className="btn btn-primary me-2">
        Agendar
      </Link>
      <Link to="/schedule-list" className="btn btn-outline-primary">
        Ver tudo
      </Link>
    </Layout>
  );
}
