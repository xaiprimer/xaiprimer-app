import * as React from "react";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";
import PrimerFooter from "../components/primer-footer/PrimerFooter";
import PrimerAlert from "../components/primer-alert/PrimerAlert";
import DesignProcessLeft from "../components/primer-process/DesignProcessLeft";
import DesignProcessRight from "../components/primer-process/DesignProcessRight";

import YoutubeEmbed from "../components/youtube-embed/YoutubeEmbed";

import Carousel from "react-bootstrap/Carousel";

import * as styles from "../styles/process.module.scss";

import ProcessP7102 from "../images/interconnected/processP7102.png";
import ProcessP7104 from "../images/interconnected/processP7104.png";
import ProcessP7107 from "../images/interconnected/processP7107.png";

import { Row, Col} from "react-bootstrap";

// markup
const IndexPage = () => {
  return (
    <>
      <PrimerNavbar />
      <PrimerAlert />
      <title>Project Page Sample</title>
      <body>
        <main className={styles.processMain}>
          <Row>
            <Col xs={12} md={12} lg={5}>
              <div>
                <DesignProcessLeft />
              </div>
            </Col>
            <Col xs={12} md={12} lg={7}>
              <div className={styles.processGrid}>
                <div  className={styles.processBoxScroll}>
                  <DesignProcessRight />
                  <section>
                    <div id="designprocess">
                      <h2>Design Process</h2>
                    </div>
                  <Carousel variant="dark" className={styles.processCarousel}>
                    <Carousel.Item>
                      <Carousel.Caption className={styles.processCaption}>
                        <h5>Identify Path of Data </h5>
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
                      </Carousel.Caption>
                      <img
                        className="d-block w-100"
                        src={ProcessP7104}
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <Carousel.Caption className={styles.processCaption}>
                        <h5>
                          Work on visual variables for highlighting
                          uncertatinties
                        </h5>
                      </Carousel.Caption>
                      <img
                        className="d-block w-100"
                        src={ProcessP7107}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  </section>
                  <section>
                    <div id="video">
                      <h2>Video Interview</h2>
                    </div>
                      <div className={styles.processCaption}>
                        <YoutubeEmbed embedId="XqZsoesa55w" />
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
