import React from "react";

import * as styles from "../../styles/tool.module.scss";
import Tooltip from "./Tooltip";

const Collection = ({ collection, updateCollection }) => {

  const removeItem = (d) => {
    console.log("remove d", d);
    const index = collection.indexOf(d);
    console.log(index)
    if (index > -1) {
      console.log(collection)
      const arr = collection.splice(index, 1);
      console.log(arr)
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
