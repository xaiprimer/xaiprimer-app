import React from "react";
import ClassNames from "classnames";
import {
  // Link,
  withPrefix
} from "gatsby";
import * as styles from "../../styles/visualization.module.scss";
import {
  BsX,
  BsLayoutWtf as DesignProcess,
  // BsFilm as VideoInterview,
  BsBoxArrowInUpRight as OutLink,
} from "react-icons/bs";
import dataTactics from "./data-tactics.json";

const Tooltip = ({ data, close, collection, updateCollection }) => {
  const { posX, posY } = data;
  // const [w, h] = viewport;
  const positioning = {
    left: posX,
    top: posY,
  };

  const addToCollection = (data) => {
    if (collection.map((d) => d.title).indexOf(data.title) < 0) {
      updateCollection(collection.concat(data));
    }
  };

  return (
    <div className={styles.tooltip} style={positioning}>
      {data.title && (
        <h2
          className="fst-italic text-capitalize mb-2"
          style={{ width: "calc(100% - 30px)" }}
        >
          {data.title}{" "}
          {data.category !== "tactic" && data.category !== "medium" && (
            <a
              aria-label="Outbond link"
              href={data.link}
              target="_blank"
              rel="noreferrer"
            >
              <OutLink />
            </a>
          )}
        </h2>
      )}
      {dataTactics.find((d) => d.tactic === data.title) && (
        <p className="mb-3">
          {dataTactics.find((d) => d.tactic === data.title).description}
        </p>
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
      {data.category !== "tactic" && data.category !== "medium" && (
        <>
          <h5 className="text-uppercase">Supplemental material</h5>
          <a
            className={ClassNames(styles.supplemental)}
            href={withPrefix(`/design-process-${"P71"||data.id}`)}
            target="_blank"
            rel="noreferrer"
          >
            <DesignProcess />
            <p>Explore the design process</p>
          </a>
          {/* <Link
            className={ClassNames(styles.supplemental)}
            to={`/video-interview-${data.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <VideoInterview />
            <p>Watch the video interview</p>
          </Link> */}
        </>
      )}
      {updateCollection && (
        <>
          {collection.map((d) => d.title).indexOf(data.title) < 0 && (
            <div
              className={styles.addToCollection}
              onClick={() => addToCollection(data)}
              onKeyDown={() => {
                return;
              }}
              role="button"
              tabIndex={0}
            >
              Add to collection
            </div>
          )}
          {collection.map((d) => d.title).indexOf(data.title) !== -1 && (
            <div className={styles.addedToCollection}>Added to collection</div>
          )}
        </>
      )}

      <BsX className={styles.closeBtn} onClick={() => close()} />
    </div>
  );
};

export default Tooltip;
