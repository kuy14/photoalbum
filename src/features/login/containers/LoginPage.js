import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getUserAsync } from "../login.api";
import "./login.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userState = useSelector((state) => state.login.users[0]);

  const submitHandler = (event) => {
    dispatch(getUserAsync(username, password));
    event.preventDefault();
  };

  if (userState !== undefined) {
    return <Redirect to="/album" />;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          md={6}
          style={{
            marginTop: "4em",
            padding: "2em",
            backgroundColor: "#efefef",
          }}
        >
          <h4 className="text-center mb-4">Login</h4>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="text-left">
                    Username or Email address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
