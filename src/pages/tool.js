import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import ChartWrapper from "../components/Chart/ ChartWrapper";

export default function Tool() {
  return (
    <Layout>
    <Seo title="tool" />
    <div className="Tool">
    <h1>This is the Wrapper</h1>
    <ChartWrapper />
    </div>
  </Layout>
  );
}












// import { Chart } from "../components/Chart/Chart";
// import Layout from "../components/layout";
// import Seo from "../components/seo";

// function Tool() {
//   // const [data, setData] = useState([]);

//   React.useEffect(() => {
//     d3.json("./components/Chart/glyphs.json").then((d) => {
//       setData(d);
//       setLoading(false);
//     });
//     return () => undefined;
//   }, []);

//   const [height, setHeight] = useState(window.innerHeight);
//   const [width, setWidth] = useState(window.innerWidth);
//   const updateDimensions = () => {
//     setWidth(window.innerWidth);
//     setHeight(window.innerHeight - "5vh");
//   };
//   useEffect(() => {
//     window.addEventListener("resize", updateDimensions);
//     return () => window.removeEventListener("resize", updateDimensions);
//   }, []);

//   useEffect(() => {
//     Chart(height, width);
//   }, [Chart]);

//   return (
//     <Layout>
//       <Seo title="tool" />
//       <div id="chart"></div>
//     </Layout>
//   );
// }
// export default Tool;

