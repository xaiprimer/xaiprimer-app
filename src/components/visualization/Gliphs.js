import * as d3 from "d3";

const cluster = (parent, data) => {
  d3.select(parent)
    .selectAll("circle")
    .data(data, (d) => d.id)
    .join("circle")
    .attr("r", (d) => d.r)
    .attr("fill", "#7765E3");
};

const project = (parent, data) => {
  d3.select(parent)
    .selectAll("circle")
    .data(
      data,
      (d) => d.id
    )
    .join("circle")
    .attr("r", (d) => d.r)
    .attr("fill", d=>d.fill);

  d3.select(parent)
    .selectAll("text")
    .data(
      data,
      (d) => d.id
    )
    .join("text")
    .attr("fill", "black")
    .attr("font-size", 30)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text((d) => d.title.toUpperCase());
};

export { cluster, project };
