import React from "react";
import ClassNames from "classnames";
import {Link} from "gatsby"
import * as styles from "../../styles/visualization.module.scss";
import {
  BsX,
  BsLayoutWtf as DesignProcess,
  BsFilm as VideoInterview,
  BsBoxArrowInUpRight as OutLink,
} from "react-icons/bs";


const Tooltip = ({ data, close, collection, updateCollection }) => {
  const { posX, posY } = data;
  // const [w, h] = viewport;
  const positioning = {
    left: posX,
    top: posY,
  };

  const addToCollection = (data) => {
    if (collection.map(d=>d.title).indexOf(data.title) < 0) {
      updateCollection(collection.concat(data));
    }
  };

  return (
    <div className={styles.tooltip} style={positioning}>
      {data.title && (
        <h2 className="fst-italic" style={{ width: "calc(100% - 30px)" }}>
          {data.title} <a href={data.link} target="_blank" rel="noreferrer"><OutLink/></a>
        </h2>
      )}
      {data.authors && (
        <>
          <h5 className="text-uppercase">Authors</h5>
          <p className="fst-italic">{data.authors}</p>
        </>
      )}
      {data.alltactics && (
        <>
          <h5 className="text-uppercase">Tactics</h5>
          <div className={styles.tagsContainer}>
            {data.alltactics.split(";").map((d, i) => (
              <span key={i} className={styles.tag}>
                <p>{d}</p>
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
          <h5 className="text-uppercase">Supplemental material</h5>
          <a
            className={ClassNames(styles.supplemental, {
              disabled: data.designProcess !== "" ? true : false,
            })}
            href={data.designProcesss}
            // href={data.designProcess}
            target="_blank"
            rel="noreferrer"
          >
            <DesignProcess />
            <p>Explore the design process</p>
          </a>
          <a
            className={ClassNames(styles.supplemental, {
              disabled: data.videoInterview !== "" ? true : false,
            })}
            href={data.designProcess}
            target="_blank"
            rel="noreferrer"
          >
            <VideoInterview />
            <p>Watch the video interview</p>
          </a>
        </>
      )}
      {(updateCollection) && (
        <>
          {collection.map(d=>d.title).indexOf(data.title) < 0 && (
            <div
              className={styles.addToCollection}
              onClick={() => addToCollection(data)}
            >
              Add to collection
            </div>
          )}
          {collection.map(d=>d.title).indexOf(data.title) !== -1 && (
            <div className={styles.addedToCollection}>Added to collection</div>
          )}
        </>
      )}

      <BsX className={styles.closeBtn} onClick={() => close()} />
    </div>
  );
};

export default Tooltip;
