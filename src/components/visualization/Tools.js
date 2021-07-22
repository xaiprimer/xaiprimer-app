import React, { useState } from "react";
import ClassNames from "classnames";
import * as styles from "../../styles/tool.module.scss";
import {
  // BsChevronContract as CloseIcon,
  // BsChevronExpand as OpenIcon,
  BsX as ClosePanelIcon,
  BsArrowBarDown as OpenPanelIcon,
} from "react-icons/bs";
import { Tabs, Tab } from "react-bootstrap";
import classNames from "classnames";

import Clusters from "../../images/clusters.png";
import Projects from "../../images/projects.png";
import Tactics from "../../images/tact.png";

const Tools = ({ explorationMode, setExplorationMode }) => {
  const [panel, openPanel] = useState(true);
  const togglePanel = () => {
    openPanel(!panel);
  };
  return (
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
            onSelect={(k) => setExplorationMode(k)}
            id="explorationMode"
          >
            <Tab eventKey="clusters" title="Clusters">
              <img src={Clusters} className={styles.legendImg} alt="legend"></img>
            </Tab>
            <Tab eventKey="projects" title="Projects">
              <img src={Projects} className={styles.legendImg} alt="legend"></img>
            </Tab>
            <Tab eventKey="networks" title="Networks">
              <img src={Tactics} className={styles.legendImg} alt="legend"></img>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tools;
