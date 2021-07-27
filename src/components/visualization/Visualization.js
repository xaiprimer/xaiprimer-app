import React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ClassNames from "classnames";
import * as d3 from "d3";
import {
  // BsChevronContract as CloseIcon,
  // BsChevronExpand as OpenIcon,
  BsX as CloseIcon,
  // BsArrowBarDown as OpenCollectionIcon,
} from "react-icons/bs";
import * as styles from "../../styles/tool.module.scss";
import data from "./data-primer.json";
import tours from "./guided-tours.json";
import {
  initialize as initViz,
  setZoom as setZoomViz,
  zoomValues as zoomValuesViz,
  destroy as destroyViz,
  rescalePositions as rescalePositionsViz,
  makeTourStep as makeTourStepViz
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
  const [search, setSearch] = useState(false);

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

    setTimeout(()=>{
      makeTourStepViz(tours[0].steps[0])
    }, 1000)

    setTimeout(()=>{
      makeTourStepViz(tours[0].steps[1])
    }, 7000)
  }, []);

  const pressedKeys = [];
  const openSearch = () => {
    // console.log(pressedKeys);
    const hasC = pressedKeys.indexOf("c") !== -1;
    const hasSpace = pressedKeys.indexOf(" ") !== -1;
    if (hasC && hasSpace) setSearch(true);
  };
  const downHandler = ({ key, repeat }) => {
    // console.log("key", key, "repeat", repeat, "search", search)
    if (repeat || search) return;
    pressedKeys.push(key);
    openSearch();
  };
  const upHandler = ({ key }) => {
    // console.log("key", key, "search", search)
    if (search) return;
    const index = pressedKeys.indexOf(key);
    if (index !== -1) pressedKeys.splice(index, 1);
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const changeVizMode = (mode) => {
    setZoomViz({ k: zoomValuesViz[mode] });
  };

  return (
    <>
      {search && (
        <form className={styles.searchBar}>
          <label>
            Search:
            <input
              type="text"
              onChange={(e)=>console.log(e.target.value)}
            />
          </label>
          <CloseIcon onClick={()=>setSearch(false)} />
        </form>
      )}
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
