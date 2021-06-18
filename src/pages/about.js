import * as React from "react"

import { Link } from "gatsby"

import Layout from "../components/layout"
import Chart from "../components/Chart/chart"
import Seo from "../components/seo"

const AboutPage = () => (
  <Layout>
    <Seo title="About" />
    <h1>Hi from the about</h1>
    <Chart />
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default AboutPage
