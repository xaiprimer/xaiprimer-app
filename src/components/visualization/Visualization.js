import React from "react";
import { useEffect, useRef, useState } from "react";
import ClassNames from "classnames";

import * as styles from "../../styles/tool.module.scss";
import data from "./data-primer.json";
import {
  initialize as initViz,
  switchRender as switchRenderViz,
  destroy as destroyViz,
} from "./visualization.render.js";
import Tools from "./Tools";
import Collection from "./Collection";
import Tooltip from "./Tooltip";

const Visualization = () => {
  const svgEl = useRef();
  const [prevMode, setPrevMode] = useState(null);
  const [explorationMode, setExplorationMode] = useState("clusters");
  const [tooltip, setTooltip] = useState(null);
  const [collection, updateCollection] = useState([]);

  useEffect(() => {
    destroyViz(svgEl.current);
    initViz(svgEl.current, data, explorationMode, setExplorationMode, setPrevMode, setTooltip);
  },[]);

  useEffect(() => {
    switchRenderViz(explorationMode);
  }, [explorationMode]);

  return (
    <>
      <svg
        className={ClassNames(styles.visualizationSvg, styles[explorationMode])}
        ref={svgEl}
        style={{ width: "100%", height: "100%" }}
      ></svg>
      <Tools
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
