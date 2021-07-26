import React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ClassNames from "classnames";
import * as d3 from "d3";

import * as styles from "../../styles/tool.module.scss";
import data from "./data-primer.json";
import {
  initialize as initViz,
  setZoom as setZoomViz,
  zoomValues as zoomValuesViz,
  destroy as destroyViz,
  rescalePositions as rescalePositionsViz,
} from "./visualization.render.js";
import Tools from "./Tools";
import Collection from "./Collection";
import Tooltip from "./Tooltip";

const Visualization = () => {
  const svgEl = useRef();
  const [explorationMode, setExplorationMode] = useState("clusters");
  const [zoom, setZoom] = useState(d3.zoomIdentity);
  const [tacticHighlighted, setTacticHighlighted] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [collection, updateCollection] = useState([]);
  const [viewBoxArr, setViewBoxArr] = useState([]);

  useEffect(() => {
    destroyViz(svgEl.current);
    initViz(
      svgEl.current,
      data,
      setExplorationMode,
      setTooltip,
      setZoom,
      setTacticHighlighted
    );
  }, []);

  const changeVizMode = (mode) => {
    setZoomViz({ scale: zoomValuesViz[mode] });
  };

  return (
    <>
      <svg
        className={ClassNames(
          "main-viz",
          styles.visualizationSvg,
          styles[explorationMode]
        )}
        ref={svgEl}
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
          close={() => {
            setTooltip(null);
            setTacticHighlighted(null);
          }}
          collection={collection}
          updateCollection={updateCollection}
        />
      )}
    </>
  );
};

export default Visualization;
