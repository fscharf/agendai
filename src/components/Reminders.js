import React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { Context } from "./Context/AppContext";
import { formatDate, checkDate, userSession } from "./Utils/Common";

export default function Reminders() {
  const { schedule, queryParams } = React.useContext(Context);

  queryParams({ user_id: userSession.user_id });

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
