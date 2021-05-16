import React from "react";
import { Alert, Col, Row } from "react-bootstrap";

export default function Reminders() {
  let newDate = new Date();
  let currentDate = newDate.toLocaleDateString();
  let currentHour = newDate.toLocaleTimeString();

  return (
    <Row>
      <Col md="8">
        <p>
          <i className="far fa-sticky-note me-2"></i>LEMBRETES
        </p>
        <Row>
          <Col md="4" className="mb-3">
            <Alert variant="primary">
              <span>
                Você tem um agendamento dia <strong>{currentDate}</strong> às{" "}
                <strong>{currentHour}</strong>
              </span>
            </Alert>
          </Col>
          <Col md="4" className="mb-3">
            <Alert variant="primary">
              <span>
                Você tem um agendamento dia <strong>{currentDate}</strong> às{" "}
                <strong>{currentHour}</strong>
              </span>
            </Alert>
          </Col>
          <Col md="4">
            <Alert variant="primary" className="mb-3">
              <span>
                Você tem um agendamento dia <strong>{currentDate}</strong> às{" "}
                <strong>{currentHour}</strong>
              </span>
            </Alert>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
