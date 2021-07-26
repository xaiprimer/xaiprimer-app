import React from "react";
import { Link } from "gatsby"
import { Navbar, Nav, Container } from "react-bootstrap";
import PrimerLogo from '../../assets/primer-logo.component.svg';

import * as styles from "../../styles/navbar.module.scss";

const PrimerNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className={styles.customNavbar}>
      <Container fluid>
        <Navbar.Brand as="div"><Link to="/"><PrimerLogo/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-end">
            <Link bsStyle="nav-link" className={styles.customNavbarLinks} to="/">Home</Link>
            <Link className={styles.customNavbarLinks} to="/tool">Tool</Link>
            <Link className={styles.customNavbarLinks} to="/toolBackup">Tool Old</Link>
            <Link className={styles.customNavbarLinks} to="/submit">submit</Link>
            <Link className={styles.customNavbarLinks} to="/about">about</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrimerNavbar;
