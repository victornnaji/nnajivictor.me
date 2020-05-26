import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({location}) => {
  console.log(location);
  return (
    <Layout location={location}>
      <SEO title="Home" />
      <div>hello</div>
    </Layout>
  )
}

export default IndexPage
