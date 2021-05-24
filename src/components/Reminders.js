import React, { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import api from "../services/api";
import { getUser } from "./Utils/Common";
import { formatDate } from "./Utils/Utils";

export default function Reminders() {
  const [schedule, setSchedule] = useState([]);
  const user = getUser();

  useEffect(() => {
    const getAllSchedule = async () => {
      await api
        .get("/schedule", {
          params: {
            user_id: user.user_id,
          },
        })
        .then((res) => {
          return setSchedule(res.data);
        })
        .catch((err) => {
          if (err.response || err.response.data === 401 || 400) {
            return toast.error(err.response.data.message);
          }
        });
    };
    getAllSchedule();
  }, []);

  return (
    <Row>
      <Col>
        <p>
          <i className="far fa-sticky-note me-2"></i>LEMBRETES
        </p>
        <Row>
          {schedule.length > 0 ? (
            <>
              {schedule.map((data, key) => {
                return (
                  <>
                    {data.status && (
                      <Col md="4" className="mb-3">
                        <Alert key={key} variant="primary">
                          <span>
                            Você tem um agendamento dia{" "}
                            <strong>{formatDate(data.date)}</strong> às{" "}
                            <strong>
                              {String(data.hour).replace(":00", "")}
                            </strong>
                          </span>
                        </Alert>
                      </Col>
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <p className="text-muted">Você não tem agendamentos próximos :)</p>
          )}
        </Row>
      </Col>
    </Row>
  );
}
