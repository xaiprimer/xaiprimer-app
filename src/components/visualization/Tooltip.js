import React from "react";
import * as styles from "../../styles/visualization.module.scss";
import { BsX, BsTools, BsEye } from "react-icons/bs";
const Tooltip = ({ data, close, viewport }) => {
  const { posX, posY } = data;
  // const [w, h] = viewport;
  const positioning = {
    left: posX,
    bottom: posY,
  };

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
      {data.description && (
        <>
          <p>{data.description}</p>
        </>
      )}
      {data.category !== "tactic" && (
        <>
          <h3>Supplemental material</h3>
          <p><BsTools/> Explore design process</p>
          <p><BsEye/> Watch the video interview</p>
        </>
      )}
      <div className={styles.addToCollection}>Add to collection</div>
      <BsX className={styles.closeBtn} onClick={() => close()} />
    </div>
  );
};

export default Tooltip;
