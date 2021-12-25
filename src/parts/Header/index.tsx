import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseSignout } from "../../firebase";
import "./header.css";
export const Header = () => {
  const [username, setUsername] = useState<any>("Login");
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      setUsername(user.email);
    }
  }, [user]);

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
        <Navbar.Text>
          {user ? (
            <a
              href="#"
              onClick={() => {
                firebaseSignout();
              }}
            >
              Signout
            </a>
          ) : (
            <a href="login">Signin</a>
          )}
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};
export default Header;
