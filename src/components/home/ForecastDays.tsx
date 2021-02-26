import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IForecastDaysProps } from "../../types";
import { convertUnix } from "./../../utils/util";
import "./forecastDays.css";
export default function ForecastDays(props: IForecastDaysProps) {
  return (
    <div>
      {props.weather && (
        <Container>
          <Row>
            {props.weather.daily.map((day) => {
              let weekday = convertUnix(day.dt, "day");
              let month = convertUnix(day.dt, "month");
              let date = convertUnix(day.dt, "date");
              return (
                <Col style={{ textAlign: "center" }}>
                  <strong>
                    <p className="weekDayFont">{weekday}</p>
                    <p className="monthDateFont">
                      {month} {date}
                    </p>
                    <img
                      alt="weatherIcon"
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    />
                    <p className="monthDateFont">{day.weather[0].main}</p>
                  </strong>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </div>
  );
}
