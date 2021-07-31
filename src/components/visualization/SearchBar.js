import React, { useState, useEffect } from "react";
import ClassNames from "classnames";
import { ClearButton, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import * as styles from "../../styles/tool.module.scss";
import {
  // BsChevronContract as CloseIcon,
  // BsChevronExpand as OpenIcon,
  BsX as CloseIcon,
  BsSearch as SearchIcon,
  // BsArrowBarDown as OpenCollectionIcon,
} from "react-icons/bs";

const SearchBar = ({ data, focus, highlightById }) => {
  const [search, setSearch] = useState(false);
  const pressedKeys = [];
  const openSearch = () => {
    // console.log(pressedKeys);
    const hasC = pressedKeys.indexOf("c") !== -1;
    const hasSpace = pressedKeys.indexOf(" ") !== -1;
    if (hasC && hasSpace) setSearch(true);
  };
  const downHandler = ({ key, repeat }) => {
    // console.log("key", key, "repeat", repeat, "search", search)
    if (repeat || search) return;
    pressedKeys.push(key);
    openSearch();
  };
  const upHandler = ({ key }) => {
    // console.log("key", key, "search", search)
    if (search) return;
    const index = pressedKeys.indexOf(key);
    if (index !== -1) pressedKeys.splice(index, 1);
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return (
    <>
      {true && (
        <form
          className={ClassNames(styles.searchBar, { [styles.hidden]: !search })}
        >
          <SearchIcon className={styles.icon} />
          <Typeahead
            id="searchBarTypeahead"
            placeholder="Search by project title or author"
            onChange={(selected) => {
              setSearch(false);
              focus({ dataSelection: selected, k: 4, highlighted: selected });
            }}
            onInputChange={(text) => {
              if (text === "") {
                setSearch(false);
                highlightById(data.map((d) => d.id));
              }
            }}
            autoFocus={true}
            defaultOpen={false}
            labelKey="title"
            filterBy={["title", "authors"]}
            options={data}
          >
            {({ onClear, selected }) => (
              <div className="rbt-aux">
                {/* {!!selected.length && <ClearButton onClick={onClear} />} */}
                {!!selected.length && (
                  <CloseIcon
                    aria-label="Clear"
                    type="button"
                    className={ClassNames(styles.icon,styles.closeBtn)}
                    style={{ fontSize: "2rem" }}
                    onClick={() => {
                      onClear();
                      setSearch(false);
                    }}
                  />
                )}
              </div>
            )}
          </Typeahead>
        </form>
      )}
    </>
  );
};

export default SearchBar;
