import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Footer from './Footer';
import styled from 'styled-components';
import { GlobalStyle, theme } from "@styles";
import Loading from "./Loading";
import Head from "./head";
import Nav from "./Nav";
import Social from "./Social";
const { fontSizes, fonts } = theme;

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]');
}

const Layout = ({ children, location }) => {

  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }
  }, [isLoading, location.hash]);

  const {site} = useStaticQuery(graphql`
  query LayoutQuery{
    site{
      siteMetadata{
        title,
        description,
        siteUrl
      }
    }
  }  
  `)

  return (
    <div id="root">
       <Head metadata={site.siteMetadata} />

      <GlobalStyle />

      <SkipToContent href="#content">Skip to Content</SkipToContent>
      
      {isLoading && isHome ? (
        <Loading finishLoading={() => setIsLoading(false)}/>
      ) : (
         <StyledContent>
          <Nav isHome={isHome} />
          <Social isHome={isHome} />

          <div id="content">
              {children}
              <Footer />
          </div>
       </StyledContent>
      )}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const SkipToContent = styled.a`
  position: absolute;
  top: auto;
  left: -999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -99;
  &:focus,
  &:active {
    outline: 0;
    color: var(--secondary-color);
    background-color: var(--bg);
    border-radius: ${theme.borderRadius};
    padding: 18px 23px;
    font-size: ${fontSizes.sm};
    font-family: ${fonts.SFMono};
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: ${theme.transition};
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    overflow: auto;
    z-index: 99;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default Layout
