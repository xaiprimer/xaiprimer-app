import React from "react";
import { Link } from "gatsby"
import { Navbar, Nav, Container } from "react-bootstrap";
import PrimerLogo from '../../assets/primer-logo.component.svg';

const PrimerNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as="div"><Link to="/"><PrimerLogo/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-end">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/tool">Tool</Link>
            <Link className="nav-link" to="/toolBackup">Tool Old</Link>
            <Link className="nav-link" to="/submit">submit</Link>
            <Link className="nav-link" to="/about">about</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrimerNavbar;
