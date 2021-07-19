import React, { useState } from "react";
import ClassNames from "classnames";
import * as styles from "../../styles/tool.module.scss";
import {
  BsChevronContract as CloseIcon,
  BsChevronExpand as OpenIcon,
  BsX as ClosePanelIcon,
  BsArrowBarDown as OpenPanelIcon,
} from "react-icons/bs";
import { Tabs, Tab } from "react-bootstrap";
import classNames from "classnames";

const Tools = ({explorationMode, setExplorationMode}) => {
  const [panel, openPanel] = useState(false);
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
            defaultActiveKey={explorationMode}
            onSelect={(k) => setExplorationMode(k)}
            id="explorationMode"
          >
            <Tab eventKey="clusters" title="Clusters">
              Clusters
            </Tab>
            <Tab eventKey="projects" title="Projects">
              Projects
            </Tab>
            <Tab eventKey="networks" title="Networks">
              Networks
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tools;
