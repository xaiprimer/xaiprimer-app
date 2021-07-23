import React from "react";

import * as styles from "../../styles/tool.module.scss";

const MiniMap = ({ zoom, data, rescalePositionsViz, tacticHighlighted }) => {
  const j = 240 / window.innerWidth;
  const miniMapStyle = {
    width: 240,
    height: j * (window.innerHeight - 56),
  };
  data = rescalePositionsViz(data, miniMapStyle.width, miniMapStyle.height);
  return (
    <svg className={styles.miniMap} style={miniMapStyle}>
      <g
        transform={`translate(${miniMapStyle.width / 2}, ${
          miniMapStyle.height / 2
        })`}
      >
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
      </g>
      {/* <rect className={styles.viewBox}
          width={miniMapStyle.width / zoom.k}
          height={miniMapStyle.height / zoom.k}
          x={-zoom.x * j}
          y={-zoom.y * j}
        ></rect>
      <circle className={styles.viewBox} r={miniMapStyle.height/2  / zoom.k} cx={(-zoom.x * j + miniMapStyle.width/2)} cy={(-zoom.y * j + miniMapStyle.height/2)} /> */}
    </svg>
  );
};

export default MiniMap;
