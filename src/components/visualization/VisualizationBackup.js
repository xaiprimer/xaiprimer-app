import React from "react";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import * as styles from "../../styles/tool.module.scss";
import data from "./data-primer.json";
import { cluster as renderCluster, project as renderProject } from "./Gliphs";
import Tools from  "./Tools"
import Collection from "./Collection";
import Tooltip from "./Tooltip";

const Visualization = () => {
  const svgEl = useRef();
  const g1El = useRef();
  const miniMapEl = useRef();
  const [explorationMode, setExplorationMode] = useState("clusters");
  const [tooltip, setTooltip] = useState(null);
  const [collection, updateCollection] = useState([]);
  // # const [vizViewport, setVizViewport] = useState([0, 0]);

  useEffect(() => {
    let zoomLevel = 0, initialScale = 1, initialTranslation = [0,0];
    const xy = d3.scaleLinear().domain([0, 1]).range([0, 100]);
    const radius = d3.scaleSqrt().domain([0, 1]).range([0, 20]);
    const side = d3.scaleSqrt().domain([0, 1]).range([0, 100]);
    const medium = d3.scaleLinear().domain([0, 1]).range([0, 0.58]); // to size elements within the project gliph, size is in percentage. By default as if there is a single medium in every gliph
    const linkDistance = d3.scaleSqrt().domain([0, 1]).range([0, 20]);
    const simulation = d3
      .forceSimulation()
      .force(
        "x",
        d3
          .forceX((d) => xy(+d._x))
          .strength((d) => (d.category === "tactic" ? 0 : 0.2))
      )
      .force(
        "y",
        d3
          .forceY((d) => xy(+d._y))
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

    const zoom = d3.zoom().on("zoom", zoomed),
      svg = d3.select(svgEl.current).call(zoom),
      g1 = d3.select(g1El.current),
      miniMap = d3.select(miniMapEl.current),
      bbox = svg.node().getBoundingClientRect(),
      width = bbox.width,
      height = bbox.height;

    // # setVizViewport([width, height]);

    // const vbox = g1.append("rect").attr("fill", "#3479FF");

    // contours
    const extent_x = d3.extent(data, (d) => +d._x);
    const extent_y = d3.extent(data, (d) => +d._y);

    const cont_x = d3
      .scaleLinear()
      .domain(extent_x)
      .range([0, extent_x[1] - extent_x[0]]);
    const cont_y = d3
      .scaleLinear()
      .domain(extent_y)
      .range([0, extent_y[1] - extent_y[0]]);

    let dataContour = data.map((d) => [xy(cont_x(+d._x)), xy(cont_y(+d._y))]);

    const maxX = d3.max(dataContour, (d) => d[0]);
    const maxY = d3.max(dataContour, (d) => d[1]);

    const contours = d3
      .contourDensity()
      .size([maxX, maxY])
      .bandwidth(130)
      .thresholds(7)(dataContour);

    let contour = g1.append("g").classed("contours", true).selectAll("path");

    contour
      .data(contours)
      .join("path")
      .attr("transform", `translate(${xy(extent_x[0])}, ${xy(extent_y[0])})`)
      .attr("stroke", "#ccc")
      .attr("fill", "#fff")
      .attr("fill-opacity", 0.35)
      .attr("d", d3.geoPath());

    let link = g1.append("g").selectAll(".link");
    let cluster = g1.append("g").selectAll(".cluster");
    let item = g1.append("g").selectAll(".item");
    let tactic = g1.append("g").selectAll(".tactic");

    update(makeClusters(data), []);

    // mini map
    const mm_opts = {
      width: 240,
      margin: 10,
    };
    mm_opts.height = (height / width) * mm_opts.width;
    mm_opts.x = width - mm_opts.width - 2 * mm_opts.margin;
    mm_opts.y = height - mm_opts.height - 2 * mm_opts.margin;
    miniMap.attr("transform", `translate(${mm_opts.x}, ${mm_opts.y})`);

    const mm_scale = d3
      .scaleLinear()
      .domain([0, width])
      .range([0, mm_opts.width]);

    miniMap
      .append("rect")
      .attr("width", mm_opts.width)
      .attr("height", mm_opts.height)
      .attr("fill", "white")
      .attr("stroke", "#ccc");

    miniMap
      .append("rect")
      .classed("mm_vbox", true)
      .attr("width", mm_opts.width)
      .attr("height", mm_opts.height)
      .attr("fill", "rgba(255,255,255,0.5)")
      .attr("stroke", "#3479FF");

    // set initial zoom

    const gBBox = d3.select(".contours").node().getBBox(),
      x0 = gBBox.x,
      y0 = gBBox.y,
      x1 = x0 + gBBox.width,
      y1 = y0 + gBBox.height;

    const scale = initialScale = 1 / Math.max((x1 - x0) / width, (y1 - y0) / height);
    const translation = initialTranslation = [
      -(x0 * scale + (gBBox.width * scale - width) / 2),
      -(y0 * scale + (gBBox.height * scale - height) / 2),
    ];

    svg
      .attr("viewbox", `0 0 ${width} ${height}`)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(0.01)
      )
      .transition()
      .duration(1000)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(translation[0], translation[1]).scale(scale)
      );

    function zoomed(e) {
      setTooltip(null);
      const { x, y, k } = e.transform;
      g1.attr("transform", `translate(${x},${y}) scale(${k})`);

      console.log(x, y, k)

      const {mm_x, mm_y, mm_k} = {mm_x: x*mm_opts.width/width - mm_opts.width/2, mm_y: y*mm_opts.height/height - mm_opts.height/2, mm_k: initialScale/k}

      d3.select(".mm_vbox").attr("transform", `translate(${mm_x},${mm_y}) scale(${mm_k})`);

      const previousZoom = zoomLevel;
      if (k < 0.3) {
        zoomLevel = 0;
      } else if (k < 0.8) {
        zoomLevel = 1;
      } else {
        zoomLevel = 2;
      }

      if (previousZoom !== zoomLevel) {
        switch (zoomLevel) {
          case 0:
            update(makeClusters(data), []);
            svg.style("background-color", "#F9F9F9");
            break;
          case 1:
            const projects = makeItems(data, previousZoom === 0);
            update(projects, []);
            svg.style("background-color", "#FEF7EB");
            break;
          case 2:
            const net = makeNetworks(data);
            update(net.nodes, net.links);
            svg.style("background-color", "#FFF4DE");
            break;
          default:
          // do nothing
        }
      }
    }

    function ticked() {
      cluster.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      item.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      tactic.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      link.attr("d", linkArc);
    }

    function update(nodes, links) {
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
        .attr("fill", d=> d.category==="medium"?"#FFFFFF":"#E5E5E5")
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
    }

    function linkArc(d) {
      const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
      return `
        M${d.source.x},${d.source.y}
        A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
      `;
    }

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
          x: xy(d[1][0]),
          y: xy(d[1][1]),
          fading_x: xy(d[1][0]),
          fading_y: xy(d[1][1]),
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
        const _clusterPosition = clustersPositions.find(
          (c) => c[0] === d.cluster
        );
        if (setCoordinates) {
          d.x = xy(_clusterPosition[1][0]);
          d.y = xy(_clusterPosition[1][1]);
        }
        d.fading_x = xy(_clusterPosition[1][0]);
        d.fading_y = xy(_clusterPosition[1][1]);
        d.media = Array.isArray(d.media)?d.media:d.media.split(";");
      });
      // set size of a "medium" in the gliph
      const mediumSize = 0.58 / d3.max(data, (d) => d.media.length);
      medium.range([0,mediumSize])

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
              x: xy(_cluster[1][0]),
              y: xy(_cluster[1][1]),
              fading_x: xy(_cluster[1][0]) + 0,
              fading_y: xy(_cluster[1][1]) + 0,
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
          const _arr = v.map((vv) => Array.isArray(vv.media)?vv.media.flat():vv.media.split(";").flat()).flat();
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
              x: xy(_cluster[1][0]),
              y: xy(_cluster[1][1]),
              fading_x: xy(_cluster[1][0]) + 0,
              fading_y: xy(_cluster[1][1]) + 0,
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

            d.media = Array.isArray(d.media)?d.media:d.media.split(";")
            const linksMedia = d.media.map((t)=>({
              id: temp + t,
              source: d,
              target: flatMedia.find((fm) => fm.id === d.cluster + "-" + t),
            }))
            return linksTactics.concat(linksMedia)
          });
        },
        (d) => d.cluster
      );
      const flatLinks = links.map((d) => d[1].flat()).flat();
      // console.log("flatLinks", flatLinks);

      return { nodes: data.concat(flatTactics, flatMedia), links: flatLinks };
    }
  }, []);

  return (
    <>
      <svg
        className={styles.visualizationSvg}
        ref={svgEl}
        style={{ width: "100%", height: "100%" }}
      >
        <g ref={g1El}></g>
        <g ref={miniMapEl}></g>
      </svg>
      <Tools explorationMode={explorationMode} setExplorationMode={setExplorationMode}/>
      <Collection collection={collection} updateCollection={updateCollection} />
      {tooltip && (
        <Tooltip
          data={tooltip}
          close={() => setTooltip(null)}
          collection={collection}
          updateCollection={updateCollection}
          viewport={vizViewport}
        />
      )}
    </>
  );
};

export default Visualization;
