import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({location}) => {
  return (
    <Layout location={location}>
      <SEO title="Home" />
      <div>hello</div>
    </Layout>
  )
}

export default IndexPage
