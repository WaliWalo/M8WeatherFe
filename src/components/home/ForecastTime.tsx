import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IForecastTimeProps } from "../../types";
import { convertUnix } from "../../utils/util";
import "./forecastTime.css";

export default function ForecastTime(props: IForecastTimeProps) {
  return (
    <div>
      {props.weather && (
        <Container>
          <Row>
            <div className="scroll">
              {props.weather.hourly.map((hour) => {
                let hourTxt = convertUnix(hour.dt, "hour");
                return (
                  <div>
                    <p>{hourTxt}</p> <p>{hour.weather[0].main}</p>
                    <img
                      alt="weatherIcon"
                      src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                    />
                    <p>{hour.temp} °C</p>
                  </div>
                );
              })}
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}
