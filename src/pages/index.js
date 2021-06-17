import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <section>
      <h2>
        The <span className="serif">XAI Primer</span> lets you explore
        Explainable Artififial Intelligence strategies and applications to
        support designers conceptualising and developing new projects
      </h2>
      <h3>Explore the ideation space as if you are visiting an art gallery</h3>
      <h3 className="intro">
        The tree view lets you explore the correlation between tactics and
        strategies suitable for biulding XAI products. The PROJECTION view lets
        you explore the correlation between tactics, strategies suitable for
        biulding XAI products and case studies. Guided tours provide curated and
        critical readings of the visualisation.
      </h3>
    </section>
  </Layout>
)

export default IndexPage
