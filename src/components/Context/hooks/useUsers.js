import React from "react";
import api from "../../../services/api";
import { User } from "../../Controllers/UserController";
import { userSession } from "../../Utils/Common";

export default function useUsers() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState([]);
  const userClass = new User();

  React.useEffect(() => {
    let isMounted = false;
    (async () => {
      if (userSession) {
        await api.get(`/users/${userSession.user_id}`).then((res) => {
          if (!isMounted) {
            setUser(res.data);
          }
        });
        setLoading(false);
      }
    })();

    return () => {
      isMounted = true;
    };
  }, []);

  return { loading, user, userClass };
}
