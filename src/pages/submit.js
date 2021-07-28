import * as React from "react";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";
import PrimerFooter from "../components/primer-footer/PrimerFooter";

import { Row, Col, Button } from "react-bootstrap";

// markup
const IndexPage = () => {
  return (
    <>
      <PrimerNavbar />
      <title>The XAI Primer</title>
      <body>
        <main>
          <Row>
            <Col></Col>
            <Col xs={7}>
              <h1>Do you think your project could be part of the primer?</h1>
              <h1>Do you have new strategies to add?</h1>
              <Button className={"actionButton"}><h4>Contact us</h4></Button>
            </Col>
            <Col></Col>
          </Row>
          <PrimerFooter />
        </main>
      </body>
    </>
  );
};

export default IndexPage;
