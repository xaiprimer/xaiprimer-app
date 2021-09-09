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
          <section className="about">
          <Row>
            <Col></Col>
            <Col xs={6}>
            <div className="floatingSquare"></div>
              <h1 className="foreText">
                We propose an exploratory interface depicting both XAI
                strategies and applications to support designers conceptualizing
                and developing new projects.
              </h1>
              <br></br>
              <Row></Row>
              <div>
                <h2 className="intro">
                  Explainable Artificial Intelligence (XAI) processes typically
                  combine various explanation and verification strategies to
                  support the analysis in different domains. Due to the
                  increasing number of techniques and the variety of XAI methods
                  deployed, deriving a comprehensive overview framework of
                  different strategy combinations remains challenging. The paper
                  presents a proposal for a digital ideation space in which
                  designers of XAI processes can derive inspiration and
                  investigate existing works. The XAI Primer is designed based
                  on the metaphor of a museum. Users can explore the presented
                  ideation space as if they were artists visiting an art
                  gallery. We enable serendipitous and guided explorations,
                  allowing them to investigate and probe the state-of-the-art as
                  a source of inspiration
                </h2>
              </div>
              
            </Col>
            <Col></Col>
          </Row>
          </section>
          <Row>
          <hr></hr>
          <Col></Col>
            <Col xs={6}>
              {/* <section className="references">
                <h2 className="intro">References</h2>
                <div className="floatingSquareSmall"></div>
                <ul className="foreText">
                  <li><h3>
                    Mennatallah El-Assady, Wolfgang Jentner, RebeccaKehlbeck,
                    Udo Schlegel, Rita Sevastjanova, FabianSperrle, Thilo
                    Spinner, and Daniel Keim. 2019.Towards XAI : Structuring the
                    Processes of Explanations. InProc. of ACM CHI Workshop
                    onHuman-Centered Machine Learning Beatrice Gobbo. 2020.
                    </h3></li>

                  <li><h3>
                    Explaining AI Through CriticalReflection Artifacts - On the
                    Role of Communication Design Within XAI. InAdvanced Visual
                    Interfaces. AVI2020 Workshops, AVI-BDA and ITAVIS,Ischia,
                    Italy,Vol. 12585. Springer, 184–188
                    </h3></li>
                </ul>
              </section> */}
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
