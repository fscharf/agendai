import React, { useContext, useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { Context } from "./Context/AppContext";
import { formatDate, checkDate } from "./Utils/Common";

export default function Reminders() {
  const [schedule, setSchedule] = useState([]);
  const { user, scheduleClass } = useContext(Context);

  useEffect(() => {
    scheduleClass
      .get({ userKey: user.user_id })
      .then((res) => setSchedule(res.data));
  }, [scheduleClass, user]);

  return (
    <Row>
      <Col>
        <p>
          <i className="far fa-sticky-note me-2"></i>Lembretes
        </p>
        <Row>
          {schedule.length > 0 ? (
            <>
              <p className="text-muted">
                Mostrando apenas os próximos agendamentos.
              </p>
              {schedule.map((data) => {
                return (
                  <>
                    {data.status && checkDate(data.date) >= checkDate() && (
                      <Col md="3" key={data.schedule_id} className="mb-3">
                        <Alert variant="primary">
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
