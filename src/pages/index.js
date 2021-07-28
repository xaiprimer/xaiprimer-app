import * as React from "react";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";
import PrimerCard from "../components/primer-card/PrimerCard";
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
                The Explainable Artificial Intelligence Primer lets you explore XAI strategies and applications
                to support designers conceptualising and developing new projects{" "}
              </h1>
              <Row></Row>
              <div className="introText">
                <h2 className="intro">
                  Explainable Artificial Intelligence (XAI) processes typically
                  combine various explanation and verification strategies to
                  support the analysis in different domains.
                  <br></br>
                  We propose an exploratory interface depicting both XAI strategies and applications to
                  support designers conceptualizing and developing new projects.
                  <br></br>
                  The XAI Primer is designed based on the metaphor of a
                  museum. Designers can explore the presented ideation space as
                  if they were artists visiting an art gallery. We enable
                  serendipitous and guided explorations, allowing them to
                  investigate and probe the state of the art as a source of
                  inspiration.
                </h2>
                <h2 className="intro">
                  The <strong>PROJECTION view </strong>lets you explore the
                  correlation between tactics, strategies suitable for biulding
                  XAI products and case studies. <strong>Guided tours</strong> provide curated and critical
                  readings of the visualisation
                </h2>
              </div>
              <div><PrimerCard /></div>
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
