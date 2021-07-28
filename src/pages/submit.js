import * as React from "react";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";

import { Row, Col } from "react-bootstrap";

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
            <h1>
Submit your 
            </h1>
            </Col>
            </Row>
        <footer>
        <p>The XAI Primer 2021</p>
      </footer>  
      </main>
      </body>
    </>
  );
};

export default IndexPage;
