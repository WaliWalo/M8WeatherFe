import React from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { ISelectCityProps } from "./../../types";

export default function SelectCity(props: ISelectCityProps) {
  return (
    <div style={{ height: "100%" }}>
      <ListGroup style={{ color: "black" }}>
        {props.cities &&
          props.cities.cities.map((city, i) => (
            <ListGroup.Item
              onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
                props.handleSelectCity(city)
              }
              key={i}
            >
              <Row>
                <Col>
                  <p>{city.name} </p>
                </Col>
                <Col>
                  <p>{city.current.temp} °C</p>
                </Col>
                <Col>
                  <p>{city.timezone}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <Button
        onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) =>
          props.routeProps.history.push("/search")
        }
      >
        Add City
      </Button>
    </div>
  );
}
