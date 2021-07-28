import * as React from "react";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";
import PrimerFooter from "../components/primer-footer/PrimerFooter";


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
              The XAI Primer is the result of an interdisciplinary collaboration
            </h1>
            <Row></Row>
            <div className="introText">
              <h2 className="intro">
                Explore the ideation space as if you are visiting an art gallery.
               </h2>
            </div>
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
