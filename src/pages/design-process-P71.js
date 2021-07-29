import * as React from "react";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";
import PrimerFooter from "../components/primer-footer/PrimerFooter";
import PrimerAlert from "../components/primer-alert/PrimerAlert";
import YoutubeEmbed from "../components/youtube-embed/YoutubeEmbed";

import Carousel from "react-bootstrap/Carousel";

import * as styles from "../styles/process.module.scss";

import ProcessP7101 from "../images/interconnected/processP7101.png";
import ProcessP7102 from "../images/interconnected/processP7102.png";
import ProcessP7103 from "../images/interconnected/processP7103.png";
import ProcessP7104 from "../images/interconnected/processP7104.png";
import ProcessP7105 from "../images/interconnected/processP7105.png";
import ProcessP7106 from "../images/interconnected/processP7106.png";
import ProcessP7107 from "../images/interconnected/processP7107.png";

import { Row, Col, Button } from "react-bootstrap";

// markup
const IndexPage = () => {
  return (
    <>
      <PrimerNavbar />
      <PrimerAlert />
      <title>Project Page Sample</title>
      <body>
        <main>
          <Row>
            <Col xs={12} md={12} lg={5}>
              <div className={styles.processBoxFix}>
                <h1>Interconnected</h1>
              </div>
              {/* <PrimerProcess /> */}
            </Col>
            <Col xs={12} md={12} lg={7}>
              <div className={styles.processGrid}>
                <div className={styles.processBoxScroll}>
                  <h2>
                    Interconnected is a project that relates IOT devices with
                    personal data
                  </h2>
                  <section>
                    <h5>END USERS</h5>
                    <h4>
                      Broad audience of non-techinical people interested in IOT
                      looking for tools helping to understand how IOT works in
                      realtion to personal data. People belonging to this
                      audience are bot skeptical users and people who fear iot
                      can steal private information
                    </h4>
                  </section>
                  <section>
                    <h5>OBJECTIVES</h5>
                    <h4>
                      To talk to general audience about an unknown topic;to give
                      tools for understanding;to generate awareness among the
                      general audience
                    </h4>
                  </section>
                  <section>
                    <h5>CHALLENGES</h5>
                    <h4>
                      Simplification;understand the topic as a non
                      expert;communicate to the geenral public
                    </h4>
                  </section>
                  <section>
                    <div id="designprocess" className={styles.processTitle}>
                      <h2>Design Process</h2>
                    </div>
                    <div>
                      <div>
                        <Carousel className={styles.processCarousel}>
                          <Carousel.Item>
                          <Carousel.Caption className={styles.processCaption}>
                              <h5>Identify Path of Data </h5>
                              <p>
                                Nulla vitae elit libero, a pharetra augue mollis
                                interdum.
                              </p>
                            </Carousel.Caption>
                            <img
                              className="d-block w-100"
                              src={ProcessP7102}
                              alt="First slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                          <Carousel.Caption className={styles.processCaption}>
                              <h5>Simplify and find a narrative</h5>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                              </p>
                            </Carousel.Caption>
                            <img
                              className="d-block w-100"
                              src={ProcessP7104}
                              alt="Second slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                          <Carousel.Caption className={styles.processCaption}>
                              <h5>Work on visual variables for highlighting uncertatinties</h5>
                              <p>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur.
                              </p>
                            </Carousel.Caption>
                            <img
                              className="d-block w-100"
                              src={ProcessP7107}
                              alt="Third slide"
                            />
                          </Carousel.Item>
                        </Carousel>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div id="video" className={styles.processTitle}>
                      <h2>Video Interview</h2>
                    </div>
                    <div className={styles.processImages}>
                      <div>
                        <h5>IDENTIFY DEVICES</h5>
                        <YoutubeEmbed embedId="rokGy0huYEA" />
                      </div>
                    </div>
                  </section>
                </div>
                <div className={styles.processContent}>
                  <div className={styles.processTitle}>
                    <a href="#designprocess">
                      <ul>
                        <h2>Design Process</h2>
                      </ul>
                    </a>
                    <a href="#video">
                      <ul>
                        <h2>Video Interview</h2>
                      </ul>
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <PrimerFooter />
        </main>
      </body>
    </>
  );
};

export default IndexPage;
