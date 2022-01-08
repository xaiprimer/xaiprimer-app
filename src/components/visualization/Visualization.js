import React from "react";
import { useEffect, useRef, useState } from "react";
import ClassNames from "classnames";
import * as d3 from "d3";
import * as styles from "../../styles/tool.module.scss";
import data from "./data-primer.json";
import tours from "./guided-tours.json";
import {
	initialize as initViz,
	setZoom as setZoomViz,
	zoomValues as zoomValuesViz,
	destroy as destroyViz,
	// rescalePositions as rescalePositionsViz,
	makeTourStep as makeTourStepViz,
	zoomToSelection as zoomToSelectionViz,
	highlightElementsById as highlightElementsByIdViz,
} from "./visualization.render.js";
import Tools from "./Tools";
import Collection from "./Collection";
import Tooltip from "./Tooltip";
import SearchBar from "./SearchBar";

const Visualization = () => {
	const svgEl = useRef();
	const [explorationMode, setExplorationMode] = useState("clusters");
	// const [zoom, setZoom] = useState(d3.zoomIdentity);
	const setZoom = useState(d3.zoomIdentity)[1];
	// const [tacticHighlighted, setTacticHighlighted] = useState(null);
	const setTacticHighlighted = useState(null)[1];
	const [tooltip, setTooltip] = useState(null);
	const [collection, updateCollection] = useState([]);

	useEffect(() => {
		destroyViz(svgEl.current);
		initViz(
			svgEl.current,
			data,
			setExplorationMode,
			setTooltip,
			setZoom,
			setTacticHighlighted
		);
	}, [setZoom, setTacticHighlighted]);

	const changeVizMode = (mode) => {
		mode = mode !== "tours" ? mode : "clusters";
		setZoomViz({ k: zoomValuesViz[mode] });
	};

	return (
		<>
			<SearchBar
				data={data}
				focus={zoomToSelectionViz}
				highlightById={highlightElementsByIdViz}
			/>
			<svg
				className={ClassNames(
					"main-viz",
					styles.visualizationSvg,
					styles[explorationMode]
				)}
				ref={svgEl}
			></svg>
			<Tools
				changeVizMode={changeVizMode}
				explorationMode={explorationMode}
				setExplorationMode={setExplorationMode}
				setZoomViz={setZoomViz}
				makeTourStepViz={makeTourStepViz}
				tours={tours}
			/>
			<Collection collection={collection} updateCollection={updateCollection} />
			{tooltip && (
				<Tooltip
					data={tooltip}
					close={() => {
						setTooltip(null);
						setTacticHighlighted(null);
					}}
					collection={collection}
					updateCollection={updateCollection}
				/>
			)}
		</>
	);
};

export default Visualization;
