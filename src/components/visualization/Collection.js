import React from "react";

import * as styles from "../../styles/tool.module.scss";
import Tooltip from "./Tooltip";

const Collection = ({ collection, updateCollection }) => {

  const removeItem = (d) => {
    const index = collection.indexOf(d);
    if (index > -1) {
      const arr = collection.filter((el, i)=>i!==index);
      updateCollection(arr);
    }
  };

  return (
    <div className={styles.collection}>
      <div className={styles.header}>Collection</div>
      <div className={styles.body}>
        <div className={styles.group}>
          <h5 className="text-uppercase">Artifacts/Applications</h5>
          {collection
            .filter((d) => !d.category)
            .map((d, i) => (
              <Tooltip key={"coll" + i} data={d} close={() => removeItem(d)} />
            ))}
        </div>
        <div className={styles.group}>
          <h5 className="text-uppercase">Tactics</h5>
          {collection
            .filter((d) => d.category === "tactic")
            .map((d, i) => (
              <Tooltip key={"coll" + i} data={d} close={() => removeItem(d)} />
            ))}
        </div>
      </div>
      <div className={styles.download}>Download</div>
    </div>
  );
};

export default Collection;
