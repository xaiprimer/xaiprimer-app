import React from "react";
import * as styles from "../../styles/visualization.module.scss";

const Tooltip = ({ data, close, viewport }) => {
  const { posX, posY } = data;
  const [w, h] = viewport;
  const positioning = {
    left: posX,
    bottom: posY,
  };

  console.log(posX, posY, positioning);

  return (
    <div className={styles.tooltip} style={positioning}>
      {data.title && <h2>{data.title}</h2>}
      {data.authors && (
        <>
          <h3>Authors</h3>
          <h2>{data.authors}</h2>
        </>
      )}
      {data.alltactics && (
        <>
          <h3>Tactics</h3>
          <div>
            {data.alltactics.split(";").map((d, i) => (
              <span key={i} className={styles.tag}>
                {d}
              </span>
            ))}
          </div>
        </>
      )}
      {data.category !== "tactic" && (
        <>
          <h3>Supplemental material</h3>
          <p>Explore design process</p>
          <p>Watch the video interview</p>
        </>
      )}
      <span onClick={() => close()}>X</span>
    </div>
  );
};

export default Tooltip;
