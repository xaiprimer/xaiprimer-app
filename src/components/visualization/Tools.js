import React, { useEffect, useState } from "react";
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

import Clusters from "../../images/clusters.png";
import Projects from "../../images/projects.png";
import Tactics from "../../images/tact.png";
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
    console.log(tourStep);
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
            <h3 className={ClassNames("text-uppercase", styles.title)}>
              Exploration modes
            </h3>
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
            >
              <Tab eventKey="tours" title={<ToursIcon />}>
                <h5>Take a guided tour</h5>
                {tours.map((d) => (
                  <h6
                    key={d.id}
                    onClick={() => {
                      goOnTour(d);
                    }}
                  >
                    {d.title}
                  </h6>
                ))}
              </Tab>
              <Tab eventKey="clusters" title="Clusters">
                <img
                  src={Clusters}
                  className={styles.legendImg}
                  alt="legend"
                ></img>
              </Tab>
              <Tab eventKey="projects" title="Projects">
                <img
                  src={Projects}
                  className={styles.legendImg}
                  alt="legend"
                ></img>
              </Tab>
              <Tab eventKey="networks" title="Networks">
                <img
                  src={Tactics}
                  className={styles.legendImg}
                  alt="legend"
                ></img>
              </Tab>
            </Tabs>
          </div>
        </div>
        {activeTour && (
          <div
            dangerouslySetInnerHTML={{
              __html: activeTour.steps[tourStep].text,
            }}
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
            >
              {"<"}
            </Button>
            <Button variant="light" onClick={() => exitTour()}>
              End Tour
            </Button>
            <Button
              variant="light"
              onClick={() => moveTour("next")}
              disabled={tourStep === activeTour.steps.length - 1}
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
