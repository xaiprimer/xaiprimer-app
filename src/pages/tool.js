import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import ChartWrapper from "../components/Chart/ChartWrapper";

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