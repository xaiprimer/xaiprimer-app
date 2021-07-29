import ClassNames from "classnames";
import React, { useState } from "react";
import * as d3 from "d3";

import * as styles from "../../styles/tool.module.scss";
import Tooltip from "./Tooltip";

import {
  BsChevronContract as CloseIcon,
  BsChevronExpand as OpenIcon,
  BsX as CloseCollectionIcon,
  BsArrowBarDown as OpenCollectionIcon,
} from "react-icons/bs";

import { Button } from "react-bootstrap";

const Collection = ({ collection, updateCollection }) => {
  const [collectionPanel, openCollectionPanel] = useState(false);
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
  };

  const toggleArtifactsPanel = () => {
    if (tacticsPanel) toggleTacticsPanel();
    openArtifactsPanel(!artifactsPanel);
  };

  const toggleTacticsPanel = () => {
    if (artifactsPanel) toggleArtifactsPanel();
    openTacticsPanel(!tacticsPanel);
  };

  const downloadRecords = () => {
    const _now_ = new Date();
    const formatDate = d3.timeFormat("%Y-%m-%d");
    const formatTime = d3.timeFormat("%H:%M:%S");
    const date = formatDate(_now_);
    const time = formatTime(_now_);

    let records = `xAI Primer – Collection\nDownloaded on ${date} at ${time}\n\n`;
    records += `You selected ${
      collection.filter((d) => !d.category).length
    } projects:\n`;
    collection
      .filter((d) => !d.category)
      .forEach((d) => {
        records += `- ${d.title}\n`;
      });
    if (collection.filter((d) => !d.category).length === 0) {
      records += `[no project selected]\n`;
    }
    records += `\n`;
    records += `You selected ${
      collection.filter(
        (d) => d.category === "tactic" || d.category === "medium"
      ).length
    } among tactics and media:\n`;
    collection
      .filter((d) => d.category === "tactic" || d.category === "medium")
      .forEach((d) => {
        records += `- ${d.title}\n`;
      });
    if (
      collection.filter(
        (d) => d.category === "tactic" || d.category === "medium"
      ).length === 0
    ) {
      records += `[no tactic or media selected]\n`;
    }
    records += `\n`;
    records += `🌚 Thanks for using xAI Primer 🌝`;

    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], { type: "text/plain" });

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);
        console.log(textFile)
        // returns a URL you can use as a href
        return textFile;
      };

    var link = document.createElement("a");
    link.setAttribute(
      "download",
      `xAI Primer - collection ${date}T${time}.txt`
    );
    link.href = makeTextFile(records);
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent("click");
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });

    console.log(records);
  };

  return (
    <div
      className={ClassNames(styles.collection, {
        [styles.open]: collectionPanel,
      })}
    >
      <div className={ClassNames(styles.header, styles.firstHeader)}>
        <h4 className={ClassNames("text-uppercase", styles.title)}>Collection</h4>
        <div></div>
        {collectionPanel && (
          <CloseCollectionIcon
            className={styles.closeBtn}
            onClick={() => toggleCollectionPanel()}
          />
        )}
        {!collectionPanel && (
          <OpenCollectionIcon
            className={styles.closeBtn}
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
            <h5 className={ClassNames("text-uppercase", styles.title)}>
              Artifacts/Applications
            </h5>
            <div className={styles.elementsCounter}>
              <p>{collection.filter((d) => !d.category).length}</p>
            </div>
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
            <h5 className={ClassNames("text-uppercase", styles.title)}>
              Explainable AI tactics
            </h5>
            <div className={styles.elementsCounter}>
              <p>
                {
                  collection.filter(
                    (d) => d.category === "tactic" || d.category === "medium"
                  ).length
                }
              </p>
            </div>
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
          {collection.filter(
            (d) => d.category === "tactic" || d.category === "medium"
          ).length === 0 && (
            <p>
              Use the tooltip to add an a tactic to this collection and download
              your record.
            </p>
          )}
          {collection
            .filter((d) => d.category === "tactic" || d.category === "medium")
            .map((d, i) => (
              <Tooltip key={"coll" + i} data={d} close={() => removeItem(d)} />
            ))}
        </div>
      </div>
      <Button className={styles.download} onClick={() => downloadRecords()}>
        Download
      </Button>
    </div>
  );
};

export default Collection;
