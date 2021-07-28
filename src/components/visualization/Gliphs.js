import * as d3 from "d3";

const showAnticollision = false;

const exploration = d3
  .scaleOrdinal()
  .domain(["guided", "open ended", "mixed"])
  .range(["#000", "#fff", "#E5E5E5"])
  .unknown("#E5E5E5");
const scenario = d3
  .scaleOrdinal()
  .domain(["exhibition", "desktop", "mobile", "multiple"])
  .range(["#FF451D", "#3479FF", "#FFC200", "#E5E5E5"])
  .unknown("#E5E5E5");

const cluster = (parent, data) => {
  const g_treemap = d3
    .select(parent)
    // .append("g")
    .selectAll(".g_treemap")
    .data(data)
    .join((enter) => enter.append("g").classed("g_treemap", true))
    .attr(
      "transform",
      (d) => `translate(-${d.side / 2},-${d.side / 2 - (d.side * 1) / 5})`
    );
  // map data
  data = data.map((d) => {
    // add treemap data structure, for scenarios
    const treemapOptions = {
      width: d.side,
      height: (d.side * 4) / 5,
      padding: 0,
      round: true,
    };
    d.root = treemap(d.scenarios, treemapOptions);
    return d;
  });

  // console.log("cluster data", data);

  // anti collision circle
  if (showAnticollision) {
    d3.select(parent)
      .selectAll("circle")
      .data(data, (d) => d.id)
      .join("circle")
      .attr("r", (d) => d.r)
      .attr("stroke", "grey")
      .attr("stroke-width", "var(--stroke-width)")
      .attr("fill", "none");
  }

  d3.select(parent)
    .selectAll(".mostRecurrentExpl")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed("mostRecurrentExpl", true))
    .attr("fill", "none")
    .attr("stroke", (d) => exploration("guided"))
    .attr("stroke-width", 3)
    .attr("stroke-width", "var(--stroke-width)")
    .attr("width", (d) => d.side)
    .attr("height", (d) => d.side)
    .attr("x", (d) => -0.5 * d.side)
    .attr("y", (d) => -0.5 * d.side);

  // render treemap scenarios
  const leaf = g_treemap
    .selectAll("g")
    .data((d) => d.root.leaves())
    .join("g")
    .classed("leaf", true)
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  leaf
    .append("rect")
    .attr(
      "id",
      (d, i) => (d.leafUid = "leaf-cluster" + d.parent.data.name + "-" + i)
    )
    .attr("fill", (d) => {
      while (d.depth > 1) d = d.parent;
      return scenario(d.data.name);
    })
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  leaf
    .append("clipPath")
    .attr("id", (d, i) => (d.clipUid = "leaf-" + d.parent.data.name + "-" + i))
    .append("use")
    .attr("xlink:href", (d) => d.leafUid.href);

  d3.select(parent)
    .selectAll(".exploration")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed("exploration", true))
    .attr("fill", (d) => exploration(d.exploration))
    .attr("stroke", "#000")
    .attr("stroke-width", "var(--stroke-width)")
    .attr("width", (d) => d.side)
    .attr("height", (d) => d.side / 5)
    .attr("x", (d) => -0.5 * d.side)
    .attr("y", (d) => -0.5 * d.side);

    g_treemap
      .selectAll("text")
      .data(data, (d) => d.id)
      .join("text")
      .attr("fill", "black")
      .attr("font-size", "var(--label-size)")
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .text((d) => d.id);
};

const project = (parent, data, mediumSize) => {
  // console.log(data)
  // mediumSize is in percentage in respect to the size of the square
  data = data.map((d) => {
    const mediaHeight = d.side * mediumSize * d.media.length;
    const borderHeight = d.side * 0.07 * 6 + mediaHeight;
    const users = d.users.split(";");
    const userGroups = [
      users.indexOf("expert") !== -1,
      users.indexOf("domain expert") !== -1,
      users.indexOf("newcomer") !== -1,
      users.indexOf("lay") !== -1,
    ];
    const tasks = d.tasks.split(";");
    const taskElements = [
      tasks.indexOf("understanding") !== -1,
      tasks.indexOf("diagnosis") !== -1,
      tasks.indexOf("refinement") !== -1,
    ];
    return { ...d, mediaHeight, borderHeight, userGroups, taskElements };
  });

  // anti collision circle
  if (showAnticollision) {
    d3.select(parent)
      .selectAll("circle")
      .data(data, (d) => d.id)
      .join("circle")
      .attr("r", (d) => d.r)
      .attr("stroke", "grey")
      .attr("stroke-width", "var(--stroke-width)")
      .attr("fill", "none");
  }

  const gliph = d3
    .select(parent)
    .append("g")
    .selectAll(".gliph")
    .data(data)
    .join((enter) => enter.append("g").classed("gliph", true))
    .attr(
      "transform",
      (d) =>
        `translate(-${d.side / 2},${
          -d.side / 2 + (d.side - d.borderHeight) / 2
        })`
    );

  gliph
    .selectAll(".border")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed("border", true))
    .attr("fill", "#FFFFFF")
    .attr("stroke", "#000000")
    // .attr("stroke-width", d=>d.path==="iterative"?4:1)
    .attr(
      "stroke-width",
      (d) => `calc(var(--stroke-width) * ${d.path === "iterative" ? 2 : 1})`
    )
    .attr("width", (d) => d.side)
    .attr("height", (d) => d.borderHeight);

  gliph
    .selectAll(".exploration")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed("exploration", true))
    .attr("fill", (d) => exploration(d.exploration))
    .attr("stroke", "#000000")
    .attr("stroke-width", "var(--stroke-width)")
    .attr("width", (d) => d.side)
    .attr("height", (d) => d.side * 0.07);

  gliph
    .selectAll(".nonSoCosaSono")
    .data((data) =>
      data.taskElements.map((d) => ({
        value: d,
        side: data.side,
      }))
    )
    .join((enter) => enter.append("rect").classed("nonSoCosaSono", true))
    .attr("fill", (d) => (d.value ? "#000" : "#fff"))
    .attr("stroke", "#000000")
    .attr("stroke-width", "var(--stroke-width)")
    .attr("width", (d) => (d.side - d.side * 0.21) / 3)
    .attr("height", (d) => d.side * 0.07)
    .attr("y", (d) => d.side * 0.14)
    .attr("x", (d, i) => d.side * 0.105 + ((d.side - d.side * 0.21) * i) / 3);

  gliph
    .selectAll(".media")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed("media", true))
    .attr("fill", (d) => scenario(d.scenarios))
    .attr("width", (d) => d.side - d.side * 0.21)
    .attr("height", (d) => d.mediaHeight)
    .attr("x", (d) => d.side * 0.105)
    .attr("y", (d) => d.side * 0.28);

  gliph
    .selectAll(".userGroup")
    .data((data) =>
      data.userGroups.map((d) => ({
        isPresent: d,
        side: data.side,
        borderHeight: data.borderHeight,
      }))
    )
    .join((enter) => enter.append("circle").classed("userGroup", true))
    .attr("r", (d) => d.side * 0.07)
    .attr("cy", (d) => d.borderHeight)
    .attr("cx", (d, i) => d.side * 0.175 + ((d.side - d.side * 0.35) / 3) * i)
    .attr("fill", (d) => (d.isPresent ? "#000" : "#fff"))
    .attr("stroke", "#000")
    .attr("stroke-width", "var(--stroke-width)");

  gliph
    .selectAll("text")
    .data(data, (d) => d.id)
    .join("text")
    .attr("fill", "black")
    .attr("font-size", "var(--label-size)")
    // .attr("y", 0)
    .attr("text-anchor", "middle")
    .text((d) => d.id.toUpperCase());
};

export { cluster, project };

function treemap(
  data,
  options = { width: 10, height: 10, padding: 0, round: true }
) {
  return d3
    .treemap()
    .tile(d3.treemapDice)
    .size([options.width, options.height])
    .padding(options.padding)
    .round(options.round)(
    d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );
}
