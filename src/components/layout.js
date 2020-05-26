import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Footer from './Footer';
import styled from 'styled-components';
import { GlobalStyle, theme } from "@styles";
import Loading from "./Loading";
const { colors, fontSizes, fonts } = theme;

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
  }, [isLoading]);

  const data = useStaticQuery(graphql`
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
      <GlobalStyle />
      {isLoading && isHome ? (
        <Loading finishLoading={() => setIsLoading(false)}/>
      ) : (
         <StyledContent>
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

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default Layout
