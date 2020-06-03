import React from 'react'
import styled from 'styled-components'
import BG from "../images/banner.png";
import {media} from "@styles";
import {useStaticQuery, graphql} from 'gatsby';



const Banner = () => {
    const data = useStaticQuery(graphql`
    {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/Banner/"}}) {
      nodes {
        frontmatter {
          show
        }
        html
      }
    }
  }
`)

    const {frontmatter, html} = data.allMarkdownRemark.nodes[0];
    
    return (
       <StyledBanner dangerouslySetInnerHTML={{ __html: html }} show={frontmatter.show}/>
    )
}



const StyledBanner = styled.div`
    background: var(--secondary-color);
    /* background-image: url(${BG}); */
    background-size: cover;
    color: var(--bg);
    height: 40px;
    ${media.thone`height: 60px;`}
    margin-top: 0px;
    padding: 0 15px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    display: ${props => props.show === true ? 'flex' : "none"};
    letter-spacing: 1.1px;

    p{
        display: block;
        margin: 0;
    }

    a{
        text-decoration: underline;
        color: var(--bg) !important;

        &:hover{
            color: var(--bg);
        }
    }
`;

export default Banner
