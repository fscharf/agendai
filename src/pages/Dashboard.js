import React, { useEffect, useState } from "react";
import Reminders from "../components/Reminders";
import { getUser } from "../components/Utils/Common";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import HelmetTitle from "../components/Layout/HelmetTitle";
import { User } from "../components/Controllers/UserController";

export default function Dashboard() {
  const user = getUser();
  const userData = new User();
  const [fields, setFields] = useState([]);

  useEffect(() => {
    userData.getUserById({ userKey: user.user_id }).then((res) => {
      return setFields(res.data);
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <HelmetTitle title="Início" />
      <h4>
        Bem-vindo, <strong>{fields.username}</strong>
      </h4>
      <p className="text-muted">Que tal olhar os lembretes?</p>
      <Reminders />
      <p>Atalhos</p>
      <Link to="/schedule" className="btn btn-dark">
        Agendar
      </Link>
    </Layout>
  );
}
