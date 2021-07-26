import * as React from "react";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";

// markup
const IndexPage = () => {
  return (
    <>
      <PrimerNavbar />
      <title>The XAI Primer</title>
      <main>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <h1>The XAI Primer introduction page</h1>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col sm>Guided Tour 1</Col>
          <Col sm>Guided Tour 2</Col>
          <Col sm>Guided Tour 3</Col>
          <Col></Col>
        </Row>
      </main>
    </>
  );
};

export default IndexPage;
