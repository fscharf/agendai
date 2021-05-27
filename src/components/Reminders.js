import React, { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { Schedule } from "./Controllers/ScheduleController";
import { getUser, formatDate, checkDate } from "./Utils/Common";

export default function Reminders() {
  const user = getUser();
  const [schedule, setSchedule] = useState([]);
  const fields = new Schedule();

  useEffect(() => {
    fields
      .getSchedule({ userKey: user.user_id })
      .then((res) => setSchedule(res.data))
      .catch((err) => toast.error(err.response.data.message));
    //eslint-disable-next-line
  }, []);

  return (
    <Row>
      <Col>
        <p>
          <i className="far fa-sticky-note me-2"></i>LEMBRETES
        </p>
        <p className="text-muted">Mostrando apenas os próximos agendamentos.</p>
        <Row>
          {schedule.length > 0 ? (
            <>
              {schedule.map((data, key) => {
                return (
                  <>
                    {data.status && (
                      <>
                        {checkDate(data.date) >= checkDate() && (
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
