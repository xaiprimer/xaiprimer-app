import React from "react";

import * as styles from "../../styles/tool.module.scss";

const MiniMap = ({ zoom }) => {
  const j = (240 / window.innerWidth);
  const miniMapStyle = {
    width: 240,
    height: j * (window.innerHeight - 56),
  };
  return (
    <svg className={styles.miniMap} style={miniMapStyle}>
      <rect
        width={miniMapStyle.width / zoom.k}
        height={miniMapStyle.height / zoom.k}
        x={zoom.x * j}
        y={zoom.y * j}
        // transform={`translate(${-miniMapStyle.width/2},${-miniMapStyle.height/2})`}
      ></rect>
    </svg>
  );
};

export default MiniMap;
