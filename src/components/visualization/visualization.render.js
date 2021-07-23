import * as d3 from "d3";
import { cluster as renderCluster, project as renderProject } from "./Gliphs";
// values
let data,
  bbox,
  width,
  height,
  zoomMode = "clusters", // modes can be 3: "clusters", "projects" and "networks"
  zoomValues = {
    clusters: 1,
    projects: 2,
    networks: 3,
  };
// d3 selections
let svg, g, cluster, item, tactic, link;
// scales
// # const xy = d3.scaleLinear().domain([0, 1]).range([0, 100]);
const radius = d3.scaleSqrt().domain([0, 1]).range([0, 1]);
const side = d3.scaleSqrt().domain([0, 1]).range([0, 5]);
const medium = d3.scaleLinear().domain([0, 1]).range([0, 0.58]); // to size elements within the project gliph, size is in percentage. By default is set as if there is a single medium in every gliph
const linkDistance = d3.scaleSqrt().domain([0, 1]).range([0, 1]);
// functions
let setMode, setTooltip, zoom;
const zoomed = (e) => {
  setTooltip(null);
  const { x, y, k } = e.transform;
  g.attr("transform", `translate(${x},${y}) scale(${k})`);
  const previousMode = zoomMode;
  if (k <= zoomValues.clusters) {
    zoomMode = "clusters";
  } else if (k <= zoomValues.projects) {
    zoomMode = "projects";
  } else {
    zoomMode = "networks";
  }
  if (previousMode !== zoomMode) {
    switch (zoomMode) {
      case "clusters":
        switchRender("clusters");
        setMode("clusters");
        break;
      case "projects":
        switchRender("projects", previousMode === "clusters");
        setMode("projects");
        break;
      case "networks":
        switchRender("networks");
        setMode("networks");
        break;
      default:
        console.log("😱 no case matched. Don't update visualization.");
    }
  }
};
const linkArc = (d) => {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
};
function makeClusters(data) {
  const data_expl = data
    .map((d) => {
      return d.exploration
        .split(",")
        .map((dd) => ({ cluster: d.cluster, exploration: dd }));
    })
    .flat();

  const temp_expl = d3.flatRollup(
    data_expl,
    (v) => v.length,
    (d) => d.cluster,
    (d) => d.exploration
  );

  const explorations = d3.flatRollup(
    temp_expl,
    (v) => v,
    (d) => d[0]
  );
  // console.log("explorations",explorations)

  const returnExploration = (cluster) => {
    const _exploration = explorations.find((e) => e[0] === cluster);
    const value =
      _exploration[1].length === 1 ? _exploration[1][0][1] : "mixed";
    return value;
  };

  const data_scenarios = data
    .map((d) => {
      return d.scenarios
        .split(";")
        .map((dd) => ({ cluster: d.cluster, individual_scenario: dd }));
    })
    .flat();

  // // everything that is not "mobile" or "desktop" or "exhibition" becomes "multiple"
  const data_scenarios_reworked = data_scenarios.map((d) => {
    d.individual_scenario =
      d.individual_scenario === "mobile" ||
      d.individual_scenario === "desktop" ||
      d.individual_scenario === "exhibition"
        ? d.individual_scenario
        : "multiple";
    return d;
  });

  const temp_scenarios = d3.flatRollup(
    data_scenarios_reworked,
    (v) => v.length,
    (d) => d.cluster,
    (d) => d.individual_scenario
  );

  const scenarios = d3.flatRollup(
    temp_scenarios,
    (v) => v,
    (d) => d[0]
  );
  // console.log("scenarios",scenarios)

  const returnScenarios = (cluster) => {
    const _scenarios = scenarios.find((e) => e[0] === cluster);
    return _scenarios[1].map((d) => ({ name: d[1], value: d[2] }));
  };

  const clusters = d3
    .flatRollup(
      data,
      (v) => [d3.mean(v, (d) => d._x), d3.mean(v, (d) => d._y), v.length],
      (d) => d.cluster
    )
    .map((d) => ({
      id: d[0],
      _x: d[1][0],
      _y: d[1][1],
      x: Number(d[1][0]),
      y: Number(d[1][1]),
      fading_x: Number(d[1][0]),
      fading_y: Number(d[1][1]),
      category: "cluster",
      exploration: returnExploration(d[0]),
      scenarios: returnScenarios(d[0]),
      size: d[1][2],
      title: "Cluster " + d[0],
    }));

  // console.log("clusters data", clusters);
  return clusters;
}
function makeItems(data, setCoordinates) {
  const clustersPositions = d3.flatRollup(
    data,
    (v) => [d3.mean(v, (d) => d._x), d3.mean(v, (d) => d._y)],
    (d) => d.cluster
  );

  data.forEach((d) => {
    const _clusterPosition = clustersPositions.find((c) => c[0] === d.cluster);
    if (setCoordinates) {
      d.x = Number(_clusterPosition[1][0]);
      d.y = Number(_clusterPosition[1][1]);
    }
    d.fading_x = Number(_clusterPosition[1][0]);
    d.fading_y = Number(_clusterPosition[1][1]);
    d.media = Array.isArray(d.media) ? d.media : d.media.split(";");
  });
  // set size of a "medium" in the gliph
  const mediumSize = 0.58 / d3.max(data, (d) => d.media.length);
  medium.range([0, mediumSize]);

  return data;
}
function makeNetworks(data) {
  const clustersPositions = d3.flatRollup(
    data,
    (v) => [d3.mean(v, (d) => d._x), d3.mean(v, (d) => d._y)],
    (d) => d.cluster
  );
  const tactics = d3.flatRollup(
    data,
    (v) => {
      const _arr = v.map((vv) => vv.tactics.split(";")).flat();
      const _cluster = clustersPositions.find((c) => c[0] === v[0].cluster);
      return d3
        .flatRollup(
          _arr,
          (v) => v.length,
          (d) => d
        )
        .map((d) => ({
          id: _cluster[0] + "-" + d[0],
          title: d[0],
          _x: _cluster[1][0],
          _y: _cluster[1][1],
          x: Number(_cluster[1][0]),
          y: Number(_cluster[1][1]),
          fading_x: Number(_cluster[1][0]) + 0,
          fading_y: Number(_cluster[1][1]) + 0,
          category: "tactic",
          size: d[1],
        }));
    },
    (d) => d.cluster
  );
  const flatTactics = tactics.map((d) => d[1]).flat();
  // console.log("flatTactics", flatTactics);

  const media = d3.flatRollup(
    data,
    (v) => {
      const _arr = v
        .map((vv) =>
          Array.isArray(vv.media) ? vv.media.flat() : vv.media.split(";").flat()
        )
        .flat();
      const _cluster = clustersPositions.find((c) => c[0] === v[0].cluster);
      return d3
        .flatRollup(
          _arr,
          (v) => v.length,
          (d) => d
        )
        .map((d) => ({
          id: _cluster[0] + "-" + d[0],
          title: d[0],
          _x: _cluster[1][0],
          _y: _cluster[1][1],
          x: Number(_cluster[1][0]),
          y: Number(_cluster[1][1]),
          fading_x: Number(_cluster[1][0]) + 0,
          fading_y: Number(_cluster[1][1]) + 0,
          category: "medium",
          size: d[1],
        }));
    },
    (d) => d.cluster
  );
  const flatMedia = media.map((d) => d[1]).flat();
  // console.log("flatMedia", flatMedia);

  const links = d3.flatRollup(
    data,
    (v) => {
      return v.map((d) => {
        const temp = d.cluster + "-" + d.id + "-";

        const linksTactics = d.tactics.split(";").map((t) => ({
          id: temp + t,
          source: d,
          target: flatTactics.find((ft) => ft.id === d.cluster + "-" + t),
        }));

        d.media = Array.isArray(d.media) ? d.media : d.media.split(";");
        const linksMedia = d.media.map((t) => ({
          id: temp + t,
          source: d,
          target: flatMedia.find((fm) => fm.id === d.cluster + "-" + t),
        }));
        return linksTactics.concat(linksMedia);
      });
    },
    (d) => d.cluster
  );
  const flatLinks = links.map((d) => d[1].flat()).flat();
  // console.log("flatLinks", flatLinks);

  return { nodes: data.concat(flatTactics, flatMedia), links: flatLinks };
}
// simulation
const ticked = () => {
  cluster.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  item.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  tactic.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  link.attr("d", linkArc);
};
const simulation = d3
  .forceSimulation()
  .force(
    "x",
    d3
      .forceX((d) => Number(d._x))
      .strength((d) => (d.category === "tactic" ? 0 : 0.2))
  )
  .force(
    "y",
    d3
      .forceY((d) => Number(d._y))
      .strength((d) => (d.category === "tactic" ? 0 : 0.2))
  )
  .force(
    "link",
    d3
      .forceLink()
      .id((d) => d.id)
      .distance((d) => linkDistance(d.target.size))
  )
  .force("charge", d3.forceManyBody().strength(-200))
  .force(
    "collide",
    d3
      .forceCollide()
      .radius((d) => (!d.category ? side(d.size || 1) : radius(d.size)))
      .iterations(1)
  )
  .on("tick", ticked)
  .velocityDecay(0.65)
  .alphaDecay(0.01)
  .stop();
const switchRender = (mode, setCoordinates) => {
  switch (mode) {
    case "clusters":
      // console.log("update, clusters");
      update(makeClusters(data), []);
      break;
    case "projects":
      // console.log("update, projects");
      const projects = makeItems(data, setCoordinates);
      update(projects, []);
      break;
    case "networks":
      // console.log("update, networks");
      const net = makeNetworks(data);
      update(net.nodes, net.links);
      break;
    default:
      console.log("😱 no case matched. Don't update visualization.");
  }
};
const setZoom = (options) => {
  let newZoom = d3.zoomIdentity;
  let oldZoom = d3.zoomTransform(g.node());
  const { translation, scale } = options;
  if (Array.isArray(translation)) {
    const [x, y] = translation;
    newZoom = newZoom.translate(x, y);
  } else {
    const { x, y } = oldZoom;
    newZoom = newZoom.translate(x, y);
  }
  if (!isNaN(scale)) {
    newZoom = newZoom.scale(scale);
  } else {
    const { k } = oldZoom;
    newZoom = newZoom.scale(k);
  }
  // const [_x, _y] = [width / 2 / 1, height / 2 / 1];
  svg.transition().duration(1000).call(zoom.transform, newZoom);
};
const initialize = (element, _data, _setMode, _setTooltip) => {
  console.log("initialize visualization");

  // Initialize variables
  data = _data;
  setTooltip = _setTooltip;
  setMode = _setMode;
  zoom = d3.zoom().on("zoom", zoomed);
  svg = d3.select(element).call(zoom);
  g = svg.append("g");
  link = g.append("g").classed("g-links", true).selectAll(".link");
  cluster = g.append("g").classed("g-clusters", true).selectAll(".cluster");
  item = g.append("g").classed("g-items", true).selectAll(".item");
  tactic = g.append("g").classed("g-tactics", true).selectAll(".tactic");

  bbox = svg.node().getBoundingClientRect();
  width = bbox.width;
  height = bbox.height;

  svg.attr("viewbox", `0 0 ${width} ${height}`);
  switchRender("clusters");
};
const update = (nodes, links) => {
  // console.log("update");
  // console.log(nodes, links);

  link = link.data(links, (d) => d.id);
  link.exit().transition().duration(250).style("opacity", "-0.5").remove();
  link = link
    .enter()
    .append("path")
    .classed("link", true)
    .attr("stroke", "#FF451D")
    .attr("fill", "none")
    .style("opacity", "0")
    .merge(link);

  link.transition().delay(500).duration(500).style("opacity", "1");

  // clusters
  cluster = cluster.data(
    nodes.filter((d) => d.category === "cluster"),
    (d) => d.id
  );
  cluster
    .exit()
    .transition()
    .duration(750)
    .style("opacity", "-0.5")
    .attr("transform", (d) => `translate(${d.fading_x}, ${d.fading_y})`)
    .remove();
  cluster = cluster
    .enter()
    .append("g")
    .classed("cluster", true)
    .style("opacity", "0")
    .merge(cluster);

  cluster.transition().duration(500).style("opacity", "1");

  cluster.each(function (d) {
    const _side = side(d.size);
    const _r = Math.sqrt(2 * Math.pow(_side, 2)) / 2;
    const _data = [
      {
        id: d.id,
        r: _r,
        fill: "#7765E3",
        side: _side,
        exploration: d.exploration,
        scenarios: { name: d.id, children: d.scenarios },
      },
    ];
    renderCluster(this, _data);
  });

  // projects
  item = item.data(
    nodes.filter((d) => !d.category),
    (d) => d.id
  );
  item
    .exit()
    .transition()
    .duration(750)
    .style("opacity", "-0.5")
    .attr("transform", (d) => `translate(${d.fading_x}, ${d.fading_y})`)
    .remove();
  item = item
    .enter()
    .append("g")
    .classed("item", true)
    .style("opacity", "0")
    .on("click", (e, d) => {
      const data = {
        ...d,
        posX: e.pageX,
        posY: e.pageY,
      };
      return setTooltip(data);
    })
    .merge(item);

  item.transition().duration(500).style("opacity", "1");

  item.each(function (d) {
    const _side = side(1);
    const _r = Math.sqrt(2 * Math.pow(_side, 2)) / 2;
    const _data = [{ ...d, r: _r, side: _side }];
    renderProject(this, _data, medium(1));
  });

  // tactics
  tactic = tactic.data(
    nodes.filter((d) => d.category === "tactic" || d.category === "medium"),
    (d) => d.id
  );
  tactic
    .exit()
    .transition()
    .duration(750)
    .style("opacity", "-0.5")
    .attr("transform", (d) => `translate(${d.fading_x}, ${d.fading_y})`)
    .remove();
  tactic = tactic
    .enter()
    .append("g")
    .classed("tactic", true)
    .style("opacity", "0")
    .on("click", (e, d) => {
      const data = {
        ...d,
        posX: e.pageX,
        posY: e.pageY,
      };
      return setTooltip(data);
    })
    .merge(tactic);

  tactic.transition().duration(500).style("opacity", "1");

  tactic
    .selectAll("circle")
    .data(
      (d) => [d],
      (d) => d.id
    )
    .join("circle")
    .attr("r", (d) => radius(d.size))
    .attr("fill", (d) => (d.category === "medium" ? "#FFFFFF" : "#E5E5E5"))
    .attr("stroke", "#FF451D");

  tactic
    .selectAll("text")
    .data(
      (d) => [d],
      (d) => d.id
    )
    .join("text")
    .attr("fill", "black")
    .attr("font-size", 10)
    .attr("y", 4)
    .attr("text-anchor", "middle")
    .text((d) => d.title.toUpperCase());

  // simulation
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
};
const destroy = (element) => {
  d3.select(element).selectAll("*").remove();
};

export { initialize, update, switchRender, setZoom, zoomValues, destroy };
