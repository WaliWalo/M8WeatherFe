import React from "react";
import CurrentDetails from "./CurrentDetails";
import ForecastDays from "./ForecastDays";
import ForecastTime from "./ForecastTime";
import Main from "./Main";
import { IHomeProps } from "../../types";
import { Button, Col, Row } from "react-bootstrap";
import { logout } from "../../api/authApi";

export default function Home(props: IHomeProps) {
  return (
    <div>
      <Row style={{ height: "25rem" }} className="p-3">
        <Col xs={10}>
          <Main weather={props.weather} />
        </Col>
        <Col xs={2}>
          {" "}
          {props.isLoggedIn ? (
            <>
              <Button
                className="mr-3"
                onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                  props.routeProps.history.push("/login");
                  props.handleIsLoggedIn();
                  logout();
                }}
              >
                Logout
              </Button>
              <Button
                onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) =>
                  props.routeProps.history.push("/select")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-building"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                  />
                  <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                </svg>
              </Button>
            </>
          ) : (
            <Button
              onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) =>
                props.routeProps.history.push("/login")
              }
            >
              Login
            </Button>
          )}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <ForecastDays weather={props.weather} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <ForecastTime weather={props.weather} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <CurrentDetails weather={props.weather} />
        </Col>
      </Row>
    </div>
  );
}
