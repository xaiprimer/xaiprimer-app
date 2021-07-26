import React, { useEffect, useState } from "react";
import * as styles from "../../styles/tool.module.scss";

// example: https://codepen.io/ivan_bacher/pen/BObLEa

const MiniMap = ({
  zoom,
  data,
  mainMap,
  rescalePositionsViz,
  tacticHighlighted,
}) => {
  console.log("render minimap");
  const [mmstyle, setMmstyle] = useState({width: 10, height: 10})
  useEffect(() => {
    if (!mainMap) return;
    console.log(mainMap);
    const _width = 240,
      mainBBox = mainMap.getBBox(),
      factor = _width / mainBBox.width;

    const temp = {}
    temp.width = _width;
    temp.height = mainBBox.height * factor;
    data = rescalePositionsViz(data, temp.width, temp.height);
    setMmstyle(temp);
  }, [data, mainMap]);

  let dx = zoom.x / zoom.k;
  let dy = zoom.y / zoom.k;

  return (
    <svg className={styles.miniMap} style={mmstyle}>
      <g transform={`translate(${mmstyle.width / 2}, ${mmstyle.height / 2})`}>

        {data.map((d) => (
          <circle
            key={d.id}
            r={
              d.tactics.toLowerCase().includes(tacticHighlighted) ||
              d.media.toLowerCase().includes(tacticHighlighted)
                ? 1.5
                : 1
            }
            cx={d._x}
            cy={d._y}
            fill={
              d.tactics.toLowerCase().includes(tacticHighlighted) ||
              d.media.toLowerCase().includes(tacticHighlighted)
                ? "var(--cognac-primer)"
                : "black"
            }
          />
        ))}

        <rect
          className={styles.viewBox}
          width={mmstyle.width / zoom.k}
          height={mmstyle.height / zoom.k}
          x={-dx}
          y={-dy}
        ></rect>

      </g>
      {/* 
      <circle className={styles.viewBox} r={miniMapStyle.height/2  / zoom.k} cx={(-zoom.x * j + miniMapStyle.width/2)} cy={(-zoom.y * j + miniMapStyle.height/2)} /> */}
    </svg>
  );
};

export default MiniMap;
