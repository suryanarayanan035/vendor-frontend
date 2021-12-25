import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Image,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useInput } from "../../hooks/useInput";
const validateCurrentPaswword = (e: any) => {
  const { value } = e.target;
  if (value?.length < 8) {
    return true;
  }
  return false;
};
const validateNewPassword = (e: any, bindConfirmPassword: any) => {
  const { value } = e.target;
  if (value?.length < 8 || value != bindConfirmPassword.value) {
    return true;
  }
  return false;
};

const validateConfirmPassword = (e: any, bindNewPassword: any) => {
  const { value } = e.target;
  if (value?.length < 8 || value != bindNewPassword.value) {
    return true;
  }
  return false;
};
export const ChangePasswordPage = () => {
  const { bind: bindCurrentPassword, error: currentPasswordError } = useInput(
    "",
    validateCurrentPaswword
  );
  const { bind: bindNewPassword, error: newPasswordError } = useInput(
    "",
    (event: any) => {
      return validateNewPassword(event, bindConfirmPassword);
    }
  );
  const { bind: bindConfirmPassword, error: confirmPasswordError } = useInput(
    "",
    (event: any) => {
      return validateConfirmPassword(event, bindNewPassword);
    }
  );
  const showError = useState(false);
  const [user, loading] = useAuthState(auth);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!loading) {
      sendPasswordResetEmail(auth, user?.email ? user?.email : "");
      console.log("Mail Sent");
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
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter current"
                  {...bindCurrentPassword}
                />
                {currentPasswordError ? (
                  <Form.Text className="text-danger">
                    Username must be minimum 8 characters length
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New  password"
                  {...bindNewPassword}
                />
                {newPasswordError ? (
                  <Form.Text className="text-danger">
                    Password must be minimum 8 characters length
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  {...bindConfirmPassword}
                />
                {confirmPasswordError ? (
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
  );
};
