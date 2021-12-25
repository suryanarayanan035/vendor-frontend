import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//custom componenets
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Image } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";

// custom stylesheets
import "./login.css";

//Firebase functions
import { auth, firebaseSignInWithEmailAndPassword } from "../../firebase";
import { useInput } from "../../hooks/useInput";
import { FirebaseError } from "firebase/app";

const validateUsername = (e: any) => {
  const { value } = e.target;
  if (!value || value.length < 8) {
    return true;
  } else {
    return false;
  }
};

const validatePassword = (e: any) => {
  const { value } = e.target;
  if (!value || value.length < 8) {
    return true;
  } else {
    return false;
  }
};

const Login = () => {
  const { bind: bindUsername, error: usernameError } = useInput(
    "",
    validateUsername
  );
  const { bind: bindPassword, error: passwordError } = useInput(
    "",
    validatePassword
  );

  const [showError, setShowError] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  console.log("user", user);
  useEffect(() => {
    if (user) {
      return navigate("/list-organizations");
    }
  }, [user]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (!usernameError && !passwordError) {
        const response = await firebaseSignInWithEmailAndPassword(
          auth,
          bindUsername.value,
          bindPassword.value
        );
        console.log(response);
        // navigate("/create-organization");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error:", error.code);
      } else {
        console.error(" Unknown Error", error);
      }
      setShowError(true);
    }
  };
  return (
    <div className="center">
      <Container>
        <Row>
          <Col
            lg={{ span: 4, offset: 4 }}
            md={{ offset: 3, span: 6 }}
            sm={{ span: 6, offset: 3 }}
          >
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/test-f8201.appspot.com/o/IMG-20211115-WA0038.jpg?alt=media&token=1a1515e3-d258-4aee-85ba-427775140de3"
              rounded
              fluid
            ></Image>
          </Col>
        </Row>
        <Row>
          <Col
            lg={{ span: 4, offset: 4 }}
            md={{ span: 6, offset: 3 }}
            sm={{ span: 6, offset: 3 }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  {...bindUsername}
                />
                {usernameError ? (
                  <Form.Text className="text-danger">
                    Username must be minimum 8 characters length
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  {...bindPassword}
                />
                {passwordError ? (
                  <Form.Text className="text-danger">
                    Password must be minimum 8 characters length
                  </Form.Text>
                ) : null}
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            {showError ? (
              <Alert variant="danger" className="mt-3 w-100 alert-width">
                Invalid Login credentials
              </Alert>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
    //   <h1>Meridian Spicktech Welcomes You</h1>
    // </div>
  );
};

export default Login;
