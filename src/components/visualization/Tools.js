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
import { Tabs, Tab } from "react-bootstrap";
import classNames from "classnames";

import Clusters from "../../images/clusters.svg";
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
              className={styles.tour}
            >
              <Tab
                eventKey="tours"
                title={<ToursIcon />}
                className={styles.customTab}
              >
                <h5>Take a guided tour</h5>
                <p>Explore the space taking a thematic tour.</p>
                {tours.map((d) => (
                  <ul key={d.id} className={styles.listTour}>
                    <h6
                      onClick={() => {
                        goOnTour(d);
                      }}
                    >
                      {d.title}
                    </h6>
                  </ul>
                ))}
              </Tab>
              <Tab
                eventKey="clusters"
                title="Clusters"
                className={styles.customTab}
              >
                <h5>How to read the visualization</h5>
                <img
                  src={Clusters}
                  className={styles.legend}
                  alt="legend"
                ></img>
              </Tab>
              <Tab
                eventKey="projects"
                title="Projects"
                className={styles.customTab}
              >
                <h5>How to read the visualization</h5>
                <img
                  src={Projects}
                  className={styles.legend}
                  alt="legend"
                ></img>
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
