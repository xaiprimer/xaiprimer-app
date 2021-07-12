import ClassNames from "classnames";
import React, { useEffect } from "react";
import { useState } from "react";

import * as styles from "../../styles/tool.module.scss";
import Tooltip from "./Tooltip";

import {
  BsChevronContract as CloseIcon,
  BsChevronExpand as OpenIcon,
  BsX as CloseCollectionIcon,
  BsArrowBarDown as OpenCollectionIcon,
  // BsLayoutWtf as DesignProcess,
  // BsFilm as VideoInterview,
} from "react-icons/bs";
import classNames from "classnames";

const Collection = ({ collection, updateCollection }) => {
  const [collectionPanel, openCollectionPanel] = useState(true)
  const [artifactsPanel, openArtifactsPanel] = useState(false);
  const [tacticsPanel, openTacticsPanel] = useState(false);
  const removeItem = (d) => {
    const index = collection.indexOf(d);
    if (index > -1) {
      const arr = collection.filter((el, i) => i !== index);
      updateCollection(arr);
    }
  };
  const toggleCollectionPanel = () => {
    openCollectionPanel(!collectionPanel);
  }

  const toggleArtifactsPanel = () => {
    if (tacticsPanel) toggleTacticsPanel()
    openArtifactsPanel(!artifactsPanel);
  };

  const toggleTacticsPanel = () => {
    if (artifactsPanel) toggleArtifactsPanel()
    openTacticsPanel(!tacticsPanel);
  };

  return (
    <div className={styles.collection}>
      <div className={ClassNames(styles.header, styles.firstHeader)}>
        <h3 className={ClassNames("text-uppercase", styles.title)}>Collection</h3>
        <div></div>
        {collectionPanel && (
          <CloseCollectionIcon
            className={styles.closeBtn}
            onClick={() => toggleCollectionPanel()}
          />
        )}
        {!collectionPanel && (
          <OpenCollectionIcon className={styles.closeBtn}
          onClick={() => toggleCollectionPanel()}
        />
        )}
      </div>
      <div className={styles.body}>
        <div
          className={ClassNames(styles.group, {
            [styles.open]: artifactsPanel,
          })}
        >
          <div className={styles.header}>
            <h5 className={ClassNames("text-uppercase", styles.title)}>Artifacts/Applications</h5>
            <div className={styles.elementsCounter}><p>{collection.filter((d) => !d.category).length}</p></div>
            {artifactsPanel && (
              <CloseIcon
                className={styles.closeBtn}
                onClick={() => toggleArtifactsPanel()}
              />
            )}
            {!artifactsPanel && (
              <OpenIcon
                className={styles.closeBtn}
                onClick={() => toggleArtifactsPanel()}
              />
            )}
          </div>
          {collection.filter((d) => !d.category).length === 0 && (
            <p>
              Use the tooltip to add an a project to this collection and
              download your record.
            </p>
          )}
          {collection
            .filter((d) => !d.category)
            .map((d, i) => (
              <Tooltip key={"coll" + i} data={d} close={() => removeItem(d)} />
            ))}
        </div>
        <div
          className={ClassNames(styles.group, { [styles.open]: tacticsPanel })}
        >
          <div className={styles.header}>
            <h5 className={ClassNames("text-uppercase", styles.title)}>Explainable AI tactics</h5>
            <div className={styles.elementsCounter}><p>{collection.filter((d) => d.category === "tactic").length}</p></div>
            {tacticsPanel && (
              <CloseIcon
                className={styles.closeBtn}
                onClick={() => toggleTacticsPanel()}
              />
            )}
            {!tacticsPanel && (
              <OpenIcon
                className={styles.closeBtn}
                onClick={() => toggleTacticsPanel()}
              />
            )}
          </div>
          {collection.filter((d) => d.category === "tactic").length === 0 && (
            <p>
              Use the tooltip to add an a tactic to this collection and download
              your record.
            </p>
          )}
          {collection
            .filter((d) => d.category === "tactic")
            .map((d, i) => (
              <Tooltip key={"coll" + i} data={d} close={() => removeItem(d)} />
            ))}
        </div>
      </div>
      <div className={styles.download}>Download</div>
    </div>
  );
};

export default Collection;
