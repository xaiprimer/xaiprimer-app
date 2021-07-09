import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ToolPage = () => {
  const svgEl = useRef();
  const g1El = useRef();

  useEffect(() => {
    d3.select("div");
  }, []);

  return (
    <>
      <svg ref={svgEl}>
        <g ref={g1El}></g>
      </svg>
    </>
  );
};

export default ToolPage;
