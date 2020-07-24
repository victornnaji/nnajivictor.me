import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo";
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'gatsby';
import { theme, mixins, media, Main } from '@styles';
import Icon404 from "../components/404Icon";
const {fonts, navDelay } = theme;

const NotFoundPage = ({location}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <Layout location={location}>
      <SEO title="404: Not found" />
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition timeout={500} classNames="fade">
            <StyledMainContainer className="fillHeight">
              <StyledTitle> <Icon404 /></StyledTitle>
              <StyledSubtitle>Mad oo! this page doesn't exist</StyledSubtitle>
              <StyledHomeButton to="/">Go Home</StyledHomeButton>
            </StyledMainContainer>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Layout>
  )
}

const StyledMainContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
`;
const StyledTitle = styled.h1`
  color: var(--secondary-color);
  font-family: ${fonts.SFMono};
  width: 50%;
  line-height: 1;
  ${media.bigDesktop`font-size: 200px;`}
  ${media.phablet`font-size: 120px;`};
`;
const StyledSubtitle = styled.h2`
  font-size: 30px;
  font-weight: 400;
  ${media.bigDesktop`font-size: 50px;`};
  ${media.phablet`font-size: 24px;`};
`;
const StyledHomeButton = styled(Link)`
  ${mixins.bigButton};
  margin-top: 40px;
`;

export default NotFoundPage
