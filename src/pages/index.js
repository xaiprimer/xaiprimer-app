import * as React from "react";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";
import PrimerCard from "../components/primer-card/PrimerCard";

import { Row, Col } from "react-bootstrap";

// markup
const IndexPage = () => {
  return (
    <>
      <PrimerNavbar />
      <title>The XAI Primer</title>
      <main>
        <Row>
          <Col></Col>
          <Col xs={7}>
            <h1>
              The XAI primer lets you explore XAI strategies and applications to
              support designers conceptualising and developing new projects{" "}
            </h1>
            <Row></Row>
            <div className="introText">
              <h2 className="intro">
                Explore the ideation space as if you are visiting an art gallery.
               </h2>
               <h2 className="intro">
                 The <strong>PROJECTION</strong> view lets you explore the correlation between
                tactics, strategies suitable for biulding XAI products and case
                studies.</h2>
                <h2 className="intro"> 
                <strong>Guided tours</strong> provide curated and critical readings of
                the visualisation
              </h2>
            </div>
            <PrimerCard></PrimerCard>
          </Col>
          <Col></Col>
        </Row>
       
      </main>
    </>
  );
};

export default IndexPage;
