import React from "react";
import { Container, Row } from "react-bootstrap";
import { IMainProps } from "../../types";
import "./main.css";

export default function Main(props: IMainProps) {
  return (
    <div>
      <Container>
        {props.weather && (
          <>
            <Row className="location">
              <h1>{props.weather.name}</h1>
            </Row>
            <Row className="temp">
              <h2>{props.weather.current.temp} °C</h2>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
