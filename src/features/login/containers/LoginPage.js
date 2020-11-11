import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getUserAsync } from "../login.api";

const LoginPage = () => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userState = useSelector((state) => state.login.users[0]);

  const submitHandler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(getUserAsync(username, password));
      event.preventDefault();
    }

    setValidated(true);
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
            borderTop: "5px solid #4285f4",
            borderRadius: "5px",
          }}
        >
          <h4 className="text-center mb-4">Login</h4>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Form noValidate validated={validated} onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="text-left">
                    Username or Email address
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter email or username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email or username with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="float-right">
                  Login
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
