import React, { useEffect, useState } from "react";
import Reminders from "../components/Reminders";
import { getUser } from "../components/Utils/Common";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import HelmetTitle from "../components/Layout/HelmetTitle";
import { User } from "../components/Controllers/UserController";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

export default function Dashboard() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = getUser();
  const userData = new User();

  useEffect(() => {
    setLoading(true);
    function getUserById() {
      userData
        .getUserById({ userKey: user.user_id })
        .then((res) => {
          setLoading(false);
          return setFields(res.data);
        })
        .catch((err) => {
          setLoading(false);
          return toast.error(err.response.data.message);
        });
    }

    getUserById();
    //eslint-disable-next-line
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Layout>
      <HelmetTitle title="Início" />
      <h4>
        Bem-vindo, <strong>{fields.username}</strong>
      </h4>
      <p className="text-muted">Que tal olhar os lembretes?</p>
      <Reminders />
      <Link to="/schedule" className="btn btn-primary">
        Agendar
      </Link>
    </Layout>
  );
}
