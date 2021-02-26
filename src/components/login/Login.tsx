import React, { useState } from "react";
import { Button, Container, Form, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../../api/authApi";
import { ILoginProps } from "../../types";

export default function Login(props: ILoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await login(email, password);

    if (response !== undefined) {
      if (response.ok) {
        let msg = await response.json();
        if (msg.status === "Ok") {
          props.handleIsLoggedIn();
          props.routeProps.history.push("/");
        } else {
          alert(msg.error);
        }
      }
    }
  };

  return (
    <Container>
      <Jumbotron fluid className="pt-5">
        <Container>
          <h1 onClick={() => props.routeProps.history.push("/")}>
            Weather For You
          </h1>
          <p>
            <Link to="/register">Sign up here</Link> or{" "}
            <Button
              href={`${process.env.REACT_APP_BE_URL}/users/googleLogin`}
              onClick={() => props.handleIsLoggedIn()}
            >
              Log in with Google
            </Button>
          </p>
        </Container>
      </Jumbotron>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
