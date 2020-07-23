import React from "react"
import Layout from "../components/layout"
import { graphql  } from 'gatsby';
import { Main } from '@styles';
import styled from "styled-components";
import {Hero, Featured} from "@components";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import WebsiteMeta from "../components/common/meta/WebsiteMeta";
import Head from "../components/head";

const IndexPage = ({location, data}) => {

  return (
    <>
    <WebsiteMeta/>
    <Head metadata={data.websiteData}/>
    <Layout location={location}>
      <StyledMainContainer>
        <Hero data={data.hero.edges}/>
        <About data={data.about.edges}/>
        <Featured data={data.featured.edges} />
        <Projects data={data.projects.edges}/>
        <Contact data={data.contact.edges}/>
      </StyledMainContainer>
    </Layout>
    </>
  )
}

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/Hero/"}}) {
      edges{
        node{
          frontmatter {
            intro
            name
            title
          }
          html
        }
      }
    }

    about: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/About/"}}) {
      edges{
        node{
          frontmatter {
            title
            skills
            avatar{
              childImageSharp{
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  src
                }
              }
            }
            avatar2{
              childImageSharp{
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  src
                }
              }
            }
          }
          html
        }
      }
    }

    featured: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/Featured/"}}) {
      edges {
        node {
          frontmatter {
            title
            tech
            github
            external
            avatar{
              childImageSharp {
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "var(--secondary-color)" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          html
        }
      }
    }

    projects: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/Portfolio/"}}, 
    sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          frontmatter {
            tech
            github
            external
            title
          }
          html
        }
      }
    }
    
    contact: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/Contact/"}}) {
      edges {
        node {
          frontmatter {
            github
            twitter
            mail
            codepen
          }
        }
      }
    }

    websiteData: site {
      siteMetadata {
        author
        description
        name
        siteUrl
        title
      }
    }


  }  
`;

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

export default IndexPage
