import React from "react";
import { Container } from "react-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./header.css";
export const Header = () => {
  const { isLoggedIn, currentUsername } = useSelector((state: any) => state);
  console.log(isLoggedIn);
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
          {isLoggedIn ? currentUsername : <a href="login">Log In</a>}
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};
export default Header;
