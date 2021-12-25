import { sendPasswordResetEmail } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseSignout } from "../../firebase";
import "./header.css";
export const Header = () => {
  const [username, setUsername] = useState<any>("Login");
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (!loading) {
      if (user) {
        setUsername(user.email);
      }
    }
  }, [user]);
  const getPasswordResetLink = () => {
    if (!loading) {
      sendPasswordResetEmail(auth, user?.email ? user?.email : "");
      console.log("Mail Sent");
    }
  };
  return (
    <Navbar className="mb-3" bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand href="/">Watch Your Waste</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Organization">
              <NavDropdown.Item href="/list-organizations">
                List Organizations
              </NavDropdown.Item>
              <NavDropdown.Item href="/create-organization">
                Create Organization
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Bin">
              <NavDropdown.Item href="/create-bin">Create Bin</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {user ? (
          <Nav>
            <NavDropdown title="Settings">
              <NavDropdown.Item onClick={getPasswordResetLink}>
                Reset Password
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  firebaseSignout();
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
export default Header;
