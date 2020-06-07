import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby';
import { Main } from '@styles';
import styled from "styled-components";
import {Hero} from "@components";

const IndexPage = ({location, data}) => {
  return (
    <Layout location={location}>
      <StyledMainContainer>
        <Hero data={data.hero.edges}/>
      </StyledMainContainer>
    </Layout>
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


  }  
`;

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

export default IndexPage
