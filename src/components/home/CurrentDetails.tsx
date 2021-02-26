import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ICurrentDetailsProps } from "../../types";
import { convertUnix } from "../../utils/util";
import "./currentDetails.css";

export default function CurrentDetails(props: ICurrentDetailsProps) {
  return (
    <Container>
      {props.weather && (
        <Row xs={12} className="details">
          <Col xs={6}>
            <Row className="mt-2">
              <div>Humidity: &nbsp;</div>
              <div>{props.weather.current.humidity}%</div>
            </Row>
            <Row className="mt-2">
              <div>Visibility: &nbsp;</div>
              <div>{props.weather.current.visibility}m</div>
            </Row>
            <Row className="mt-2">
              <div>Wind: &nbsp;</div>
              <div>{props.weather.current.wind_speed}km/h</div>
            </Row>
            <Row className="mt-2">
              <div>UVI: &nbsp;</div>
              <div>{props.weather.current.uvi}</div>
            </Row>
          </Col>
          <Col xs={6}>
            <Row className="mt-2">
              <div>Perceived Temperature: &nbsp;</div>
              <div>{props.weather.current.feels_like} °C</div>
            </Row>
            <Row className="mt-2">
              <div>Clouds: &nbsp;</div>
              <div>{props.weather.current.clouds}</div>
            </Row>
            <Row className="mt-2">
              <div>Sunrise: &nbsp;</div>
              <div>
                {props.weather.current.sunrise !== undefined &&
                  convertUnix(props.weather.current.sunrise, "hour")}
              </div>
            </Row>
            <Row className="mt-2">
              <div>Sunset: &nbsp;</div>
              <div>
                {props.weather.current.sunset !== undefined &&
                  convertUnix(props.weather.current.sunset, "hour")}
              </div>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}
