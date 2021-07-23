import React from "react";
import { useEffect, useRef, useState } from "react";
import ClassNames from "classnames";

import * as styles from "../../styles/tool.module.scss";
import data from "./data-primer.json";
import {
  initialize as initViz,
  setZoom as setZoomViz,
  zoomValues as zoomValuesViz,
  destroy as destroyViz,
} from "./visualization.render.js";
import Tools from "./Tools";
import Collection from "./Collection";
import Tooltip from "./Tooltip";

const Visualization = () => {
  const svgEl = useRef();
  const [explorationMode, setExplorationMode] = useState("clusters");
  const [tooltip, setTooltip] = useState(null);
  const [collection, updateCollection] = useState([]);

  useEffect(() => {
    destroyViz(svgEl.current);
    initViz(
      svgEl.current,
      data,
      setExplorationMode,
      setTooltip
    );
  }, []);

  const changeVizMode = (mode) => {
    setZoomViz({scale:zoomValuesViz[mode]});
  };

  return (
    <>
      <svg
        className={ClassNames(styles.visualizationSvg, styles[explorationMode])}
        ref={svgEl}
        style={{ width: "100%", height: "100%" }}
      ></svg>
      <Tools
        changeVizMode={changeVizMode}
        explorationMode={explorationMode}
        setExplorationMode={setExplorationMode}
      />
      <Collection collection={collection} updateCollection={updateCollection} />
      {tooltip && (
        <Tooltip
          data={tooltip}
          close={() => setTooltip(null)}
          collection={collection}
          updateCollection={updateCollection}
        />
      )}
    </>
  );
};

export default Visualization;
