import React, { useState } from "react";
import ClassNames from "classnames";
import * as styles from "../../styles/tool.module.scss";
import { Button, ButtonGroup } from "react-bootstrap";
import {
  // BsChevronContract as CloseIcon,
  // BsChevronExpand as OpenIcon,
  BsX as ClosePanelIcon,
  BsArrowBarDown as OpenPanelIcon,
  BsMap as ToursIcon,
} from "react-icons/bs";
import { Tabs, Tab, Col, Row } from "react-bootstrap";
import classNames from "classnames";

import Clusters01 from "../../images/clusters-01.svg";
import Clusters from "../../images/clusters.svg";
import Clusters02 from "../../images/clusters-02.svg";
import Projects from "../../images/projects.svg";
import Tactics from "../../images/tact.svg";
let tourStep = 0;
const Tools = ({
  changeVizMode,
  explorationMode,
  setExplorationMode,
  setZoomViz,
  makeTourStepViz,
  tours,
}) => {
  const [panel, openPanel] = useState(true);
  const [activeTour, setActiveTour] = useState(null);

  const togglePanel = () => {
    openPanel(!panel);
  };

  const goOnTour = (tour) => {
    setActiveTour(tour);
    tourStep = 0;
    makeTourStepViz(tour.steps[tourStep]);
  };

  const moveTour = (direction) => {
    const delta = direction === "prev" ? -1 : +1;
    tourStep = tourStep + delta;
    makeTourStepViz(activeTour.steps[tourStep]);
  };

  const exitTour = () => {
    setActiveTour(null);
    setZoomViz({ k: 2 });
  };
  return (
    <>
      <div className={classNames(styles.tools)}>
        <div className={ClassNames(styles.panel, { [styles.open]: panel })}>
          <div className={ClassNames(styles.panelHeader)}>
            <h4 className={ClassNames("text-uppercase", styles.title)}>
              Exploration modes
            </h4>
            <div></div>
            {panel && (
              <ClosePanelIcon
                className={styles.closeBtn}
                onClick={() => togglePanel()}
              />
            )}
            {!panel && (
              <OpenPanelIcon
                className={styles.closeBtn}
                onClick={() => togglePanel()}
              />
            )}
          </div>
          <div>
            <Tabs
              activeKey={explorationMode}
              onSelect={(k) => {
                setExplorationMode(k);
                changeVizMode(k);
              }}
              id="explorationMode"
              // className={styles.tour}
            >
              <Tab
                eventKey="tours"
                title={<ToursIcon />}
                className={styles.customTab}
              >
                <h5>Take a guided tour</h5>
                <p>Explore the space taking a thematic tour.</p>
                <ul>
                  {tours.map((d) => (
                    <li key={d.id} className={styles.listTour}>
                      <h6>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            goOnTour(d);
                          }}
                          onKeyDown={() => {
                            return;
                          }}
                        >
                          {d.title}
                        </span>
                      </h6>
                    </li>
                  ))}{" "}
                </ul>
              </Tab>
              <Tab
                eventKey="clusters"
                title="Clusters"
                className={styles.customTab}
              >
                <h5>How to read the visualization</h5>
                <div>
                  <Row className={styles.boxLegend}>
                    <h6>Position</h6>
                    <p className={styles.textLegend}>
                      Glyphs representing clusters of projects are positioned
                      according to their similarity, using UMAP projection.
                    </p>
                  </Row>
                  <Row className={styles.boxLegend}>
                    <Col>
                      <h6 className={styles.subtitleLegend}>Color</h6>
                      <p className={styles.textLegend}>Scenario</p>
                      <small>
                        <em>
                          <p className={styles.textLegend}>Usage</p>
                        </em>
                      </small>
                      <div className={styles.colorLegend}>
                        <ul>
                          <li>
                            <span className={styles.exhibition}></span>
                            <p className={styles.textLegend}>Exhibition</p>
                          </li>
                          <li>
                            <span className={styles.desktop}></span>
                            <p className={styles.textLegend}>Exhibition</p>
                          </li>
                          <li>
                            <span className={styles.mobile}></span>
                            <p className={styles.textLegend}>Exhibition</p>
                          </li>
                          <li>
                            <span className={styles.multiple}></span>
                            <p className={styles.textLegend}>Exhibition</p>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col>
                      <h6 className={styles.subtitleLegend}>Size</h6>
                      <p className={styles.textLegend}>Projects</p>
                      <small>
                        <em>
                          <p className={styles.textLegend}>sum of projects</p>
                        </em>
                      </small>
                      <img
                        src={Clusters01}
                        className={styles.legend}
                        alt="legend"
                      ></img>
                    </Col>
                    <Col>
                      <h6 className={styles.subtitleLegend}>Components</h6>
                      <p className={styles.textLegend}>Explorations</p>
                      <small>
                        <em>
                          <p className={styles.textLegend}>
                            Recurrent exploration
                          </p>
                        </em>
                      </small>
                      <img
                        src={Clusters02}
                        className={styles.legend}
                        alt="legend"
                      ></img>
                    </Col>
                  </Row>
                </div>
              </Tab>

              <Tab
                eventKey="projects"
                title="Projects"
                className={styles.customTab}
              >
                <h5>How to read the visualization</h5>
                <div>
                  <Row className={styles.boxLegend}>
                    <h6>Position</h6>
                    <p className={styles.textLegend}>
                      Glyphs representing clusters of projects are positioned
                      according to their similarity, using UMAP projection.
                    </p>
                  </Row>
                  <Row className={styles.boxLegend}>
                    <Col>
                      <h6 className={styles.subtitleLegend}>Color</h6>
                      <p className={styles.textLegend}>Scenario</p>
                      <small>
                        <em>
                          <p className={styles.textLegend}>Usage</p>
                        </em>
                      </small>
                      <div className={styles.colorLegend}>
                        <ul>
                          <li>
                            <span className={styles.exhibition}></span>
                            <p className={styles.textLegend}>Exhibition</p>
                          </li>
                          <li>
                            <span className={styles.desktop}></span>
                            <p className={styles.textLegend}>Exhibition</p>
                          </li>
                          <li>
                            <span className={styles.mobile}></span>
                            <p className={styles.textLegend}>Exhibition</p>
                          </li>
                          <li>
                            <span className={styles.multiple}></span>
                            <p className={styles.textLegend}>Exhibition</p>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col>
                      <h6 className={styles.subtitleLegend}>Size</h6>
                      <p className={styles.textLegend}>Projects</p>
                      <small>
                        <em>
                          <p className={styles.textLegend}>sum of projects</p>
                        </em>
                      </small>
                      <img
                        src={Clusters01}
                        className={styles.legend}
                        alt="legend"
                      ></img>
                    </Col>
                    <Col>
                      <h6 className={styles.subtitleLegend}>Components</h6>
                      <p className={styles.textLegend}>Explorations</p>
                      <small>
                        <em>
                          <p className={styles.textLegend}>
                            Recurrent exploration
                          </p>
                        </em>
                      </small>
                      <img
                        src={Clusters02}
                        className={styles.legend}
                        alt="legend"
                      ></img>
                    </Col>
                  </Row>
                </div>
              </Tab>
              <Tab
                eventKey="networks"
                title="Networks"
                className={styles.customTab}
              >
                <h5>How to read the visualization</h5>
                <img src={Tactics} className={styles.legend} alt="legend"></img>
              </Tab>
            </Tabs>
          </div>
        </div>
        {activeTour && (
          <div
            dangerouslySetInnerHTML={{
              __html: activeTour.steps[tourStep].text,
            }}
            className={styles.toursBox}
          />
        )}
      </div>
      {activeTour && (
        <div className={styles.toursControls}>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="light"
              onClick={() => moveTour("prev")}
              disabled={tourStep === 0}
              className={styles.toursButton}
            >
              {"<"}
            </Button>
            <Button
              variant="light"
              onClick={() => exitTour()}
              className={styles.toursButton}
            >
              End Tour
            </Button>
            <Button
              variant="light"
              onClick={() => moveTour("next")}
              disabled={tourStep === activeTour.steps.length - 1}
              className={styles.toursButton}
            >
              {">"}
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

export default Tools;
