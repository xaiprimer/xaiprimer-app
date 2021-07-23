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
        <rect
          width={miniMapStyle.width / zoom.k}
          height={miniMapStyle.height / zoom.k}
          x={-zoom.x * j}
          y={-zoom.y * j}
        ></rect>
        {data.map((d) => (
          <circle
            key={d.id}
            r="1"
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
    </svg>
  );
};

export default MiniMap;
