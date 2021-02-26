import React, { useState } from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { register } from "../../api/authApi";

export default function Registration() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [alert, setAlert] = useState({ message: "", color: "" });
  const [show, setShow] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.id;
    const value = target.value;
    // let user = { ...user, [name]: value };
    setUser({ ...user, [name]: value });
  };

  let history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register(user);
    if (response.ok) {
      history.push("/login");
    } else {
      let { error } = await response.json();
      console.log(error);
      setShow(true);
      setAlert({ message: error, color: "danger" });
    }
  };
  return (
    <Container>
      {show && (
        <Alert variant={alert.color} onClose={() => setShow(false)} dismissible>
          {alert.message}
        </Alert>
      )}
      <Form className="pt-5" onSubmit={(e) => handleSubmit(e)}>
        <Form.Row>
          <Col>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange(e)
              }
              id="firstName"
              placeholder="First name"
            />
          </Col>
          <Col>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange(e)
              }
              id="lastName"
              placeholder="Last name"
            />
          </Col>
        </Form.Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e)
            }
            id="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e)
            }
            id="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
